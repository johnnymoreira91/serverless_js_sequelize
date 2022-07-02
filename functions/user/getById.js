"use strict";
const Address = require('../../models/Address');
const Permission = require('../../models/Permission');
const User = require('../../models/User')
const { setCache, getCache } = require('../cache')

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  try {
    const data = await getCache(`listUsers:${id}`)
    if (!data) {
        const list = await User.findOne({
            where: {id: id},
            include: {
              all: true
            }
        })
      // const list = await User.findByPk(id)
      list.passwordHash = null
      // await setCache(`listUsers:${id}`, list, 30)
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
    console.log(error)
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
