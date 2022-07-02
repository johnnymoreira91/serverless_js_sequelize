const redis = require("redis");
const PREFIX = '__PREFIX'

// const client = redis.createClient({
//   url: process.env.REDIS_URL,
//   password: process.env.REDIS_PASSWORD
// });

// client.connect()

// client.on('data', (data) => {
//   console.log('Redis Ready')
// })

// client.on("error", function (err) {
//   throw err;
// });
// module.exports = client

async function Cache() {
  const client = redis.createClient({
    url: `${process.env.REDIS_URL}` || DEFAULT_URL,
    password: process.env.REDIS_PASSWORD || 'Redis2022!'
  })

  client.on('data', () => console.log('redis ready'))
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect()

  return client
}

async function setCache(obj, value, ttl = 30) {
  const data = await (await Cache()).set(`${obj}${PREFIX}`, JSON.stringify(value), {
    EX: ttl
  })
  return data
}

async function getCache(obj) {
  const data = await (await Cache()).get(`${obj}${PREFIX}`)
  return JSON.parse(data)
}

async function delKeyCache(obj) {
  const data = (await Cache()).del(`${obj}${PREFIX}`)
  return data
}

async function flushCache() {
  const data = await (await Cache()).flushAll()
  return data
}

module.exports = {
  setCache,
  getCache,
  delKeyCache,
  flushCache
}