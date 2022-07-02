"use strict";
const User = require('../../models/User')
const { setCache, getCache } = require('../cache')

module.exports.handler = async (event) => {
  try {
    const data = await getCache('listUsers')
    if (!data) {
      const list = await User.findAll()
      await setCache('listUsers', list, 30)
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            user: list
          },
          null,
          2
        ),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          user: data
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
