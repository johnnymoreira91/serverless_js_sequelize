"use strict";
const User = require('../../models/User')

module.exports.handler = async (event) => {
  try {
    const list = await User.findAll()
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          list
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
