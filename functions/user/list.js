"use strict";
const User = require('../../models/User')
const { setCache, getCache } = require('../cache')

module.exports.handler = async (event) => {
  const hasPermissionLevel = event.requestContext.authorizer.permissionLevel
  try {
    if (hasPermissionLevel < 1) {
      return {
        statusCode: 500,
        body: JSON.stringify(
          {
            message: 'User Doenst have permission to do it'
          },
          null,
          2
        ),
      };
    }
    const data = await getCache('listUsers')
    if (!data) {
      const list = await User.findAll()
      await setCache('listUsers', list, 30)
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: list
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
          data: data
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
