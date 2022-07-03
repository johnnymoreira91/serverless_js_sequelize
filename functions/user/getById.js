"use strict";
const database = require('../../models/BaseModel');
const User = require('../../models/User')
const { setCache, getCache } = require('../cache')

module.exports.handler = async (event) => {
  const id = event.pathParameters.id
  try {
    const data = await getCache('listUsers')
    if (!data) {
      const list = await User.findByPk(id)
      // const list = await database.connection.query(`
      // select 
      // User.id,
      // userId,
      // firstName,
      // lastName,
      // superUser,
      // active,
      // username,
      // email,
      // Permission.level,
      // Permission.name
      // from User
      // inner join
      // Permission on Permission.level = User.permissionLevel
      // `)
      // console.log(list, 'listttt')
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
