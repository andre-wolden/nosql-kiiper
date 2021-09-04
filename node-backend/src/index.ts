import {justAFunctionReturningOne} from "./utils/div";
import {createClient} from 'redis';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error:', err));

const renameMe = async () => {
    await client.connect()
    await client.set('node', 'nodeglhf');
    const value = await client.get('node');

    if (value) {
        console.info('YES! value: ' + value);

    } else {
        console.info('Noooo')
    }
}

renameMe().then( () => {
    console.info("then block, finishing up. Hope I see the result above. And this line too of course...")
})
