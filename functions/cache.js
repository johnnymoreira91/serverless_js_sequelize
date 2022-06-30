const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
});

client.connect()

client.on('data', (data) => {
  console.log('Redis Ready')
})

client.on("error", function (err) {
  throw err;
});
module.exports = client