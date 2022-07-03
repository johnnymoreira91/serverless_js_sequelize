"use strict";
const User = require('../../models/User')
const { setCache, getCache } = require('../cache')

module.exports.handler = async (event) => {
  const id = event.pathParameters.id
  try {
    const data = await getCache('listUsers')
    if (!data) {
      const list = await User.findByPk(id)
      await setCache('listUsers', list, 30)
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            list: list
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
          list: data
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
