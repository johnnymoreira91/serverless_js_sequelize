"use strict";
const database = require('../models/BaseModel');
const Status = require('../models/Status');
const User = require('../models/User');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
  try {
    // await database.connection.query(`CREATE DATABASE ourBank2;`)
    await database.connection.sync({force: true})
    await User.sync({force: true})
    await Status.sync({force: true})

    const status = await Status.create({
      status: 'Server ON'
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          status: status.status
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(
        error,
        null,
        2
      ),
    };
  }
};
