"use strict";
const database = require('../../models/BaseModel');
const User = require('../../models/User')
const { setCache, getCache } = require('../cache')

module.exports.handler = async (event) => {
  const id = event.pathParameters.id
  try {
    const data = await getCache('listUsers')
    if (!data) {
      // const list = await User.findByPk(id)
      const [results, metadata] = await database.connection.query(`
      SELECT
        User.id,
        userId,
        firstName,
        lastName,
        superUser,
        active,
        username,
        email,
        Permission.level as permissionLevel,
        Permission.name as permissionName,
        Address.zipcode,
        Address.street,
        Address.number,
        Address.complement
      FROM
        User
      INNER JOIN Permission ON Permission.level = User.permissionLevel
      INNER JOIN Address ON Address.id = User.addressId
      `)
      const list = results
      console.log(results, 'listttt')
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
