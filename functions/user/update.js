"use strict";
const User = require('../../models/User')
const { setCache, getCache } = require('../cache')

module.exports.handler = async (event) => {
     /**
     * @type {{
     * id: number,
     * userId: string,
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
    const id = event.pathParameters.id
  try {
           /**
     * @type {{
     * id: number,
      * userId: string,
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
      let data = await User.findOne({
        where: {id: id}
      })
      if (body.email) {
        if (!body.email !== data.email) {
          return {
            statusCode: 400,
            body: JSON.stringify(
              {
                data: `EMAIL cannot be altered`
              },
              null,
              2
            ),
          };
        }
      }
      const change = await User.update({...body})
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: change
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
