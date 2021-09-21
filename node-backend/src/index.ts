const express = require('express')
import {createClient} from 'redis';

interface Deal {
    id: string;
    text: string;
}

const isDeal = (input: any) =>
    (input &&
        input.id &&
        input.text)

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error:', err));

const getDeal = async (key: string) => {
    await client.connect();
    const result = await client.get(key);
    await client.disconnect();
    return result;
}
const newDeal = async (key: string , deal: Deal): Promise<Deal> => {
    await client.connect();
    await client.set(key, JSON.stringify(deal));
    const raw: string = await client.get(key);
    const result = JSON.parse(raw);
    await client.disconnect();
    return Promise.resolve(result);
}
const setText = async (dealKey: string , textUpdated: string): Promise<Deal> => {
    await client.connect();
    const raw = await client.get(dealKey);
    const parsed: Deal = JSON.parse(raw);
    const updated: Deal = {
        ...parsed,
        text: textUpdated + "-fromDb"
    }
    await client.set(dealKey, JSON.stringify(updated));
    const rawUpdated = await client.get(dealKey)
    await client.disconnect();
    return (JSON.parse(rawUpdated) as Deal);
}

const app = express()
app.use(express.json());
const port = 3000

app.get('/', async (req, res) => {
    const result = await getDeal('dealone');
    res.send('current state: ' + result);
})
app.post('/deal', async (req, res) => {
    const deal: Deal = req.body;
    console.info("deal:")
    console.info(deal)
    if (isDeal(deal)) {
        const result = await newDeal("dealone", deal);
        res.send('current state: ' + result);
    } else {
        res.send('Invalid deal!');
    }
})
app.post('/deal/text', async (req, res) => {
    const updatedText: { textUpdated: string } = req.body;
    if (updatedText && updatedText.textUpdated) {
        const result = await setText("dealone", updatedText.textUpdated);
        res.send('current state: ' + result);
    } else {
        res.send('Invalid deal!');
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
