"use strict";
const User = require('../../models/User')

module.exports.handler = async (event) => {
  try {
    const create = await User.create(JSON.parse(event.body))
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          create
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: error
        },
        null,
        2
      ),
    };
  }
};
