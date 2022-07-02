"use strict";
const User = require('../../models/User')

/**
 * @function
 * @type {import('aws-lambda').APIGatewayEvent}
 */
module.exports.handler = async (event) => {

  /**
 * @type {{
   * firstName: string,
   * lastName: string,
   * password: string,
   * username: string
   * email: string,
   * active: boolean,
   * superUser: boolean,
   * permissionLevel: number
   * }}
   */
  const body = JSON.parse(event.body)
  try {
    const create = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      superUser: body.superUser || false,
      active: body.active || true,
      password: body.password,
      username: body.username,
      email: body.email,
      permissionLevel: body.permissionLevel
    })
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
