# nosql-kiiper
checking if it would be a good idea to use nosql to create kiiper - just a test

## running with redis locally using docker

running redis

``` docker network create <network name>```

``` docker run --network <network name> --name <redis name> -p 6379:6379 redis ```

using redis-cli

``` docker run -it --network <network name> redis redis-cli -h <redis name> ```

using node test app to access redis

``` cd node-backend ```

``` yarn ```

``` yarn run it ```


