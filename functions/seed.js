"use strict";
const Address = require('../models/Address');
const database = require('../models/BaseModel');
const Permission = require('../models/Permission');
const Status = require('../models/Status');
const User = require('../models/User');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
  try {
    // await database.connection.query(`CREATE DATABASE ourBank2;`)
    await database.connection.drop()
    await database.connection.sync()
    // await Address.sync()
    // await Permission.sync()
    // await User.sync()
    // await Status.sync()

    await Permission.create({
      name: 'User',
      level: 0
    })
    await Permission.create({
      name: 'Func',
      level: 1
    })
    await Permission.create({
      name: 'Func2',
      level: 2
    })
    await Permission.create({
      name: 'Manager',
      level: 3
    })
    await Permission.create({
      name: 'CEO',
      level: 4
    })
    await Permission.create({
      name: 'PO',
      level: 5
    })
    await Permission.create({
      name: 'Dev',
      level: 6
    })

    await User.create({
      firstName: 'Johnny',
      lastName: 'Moreira',
      email: 'johnnymoreira91@hotmail.com',
      password: 'teste',
      permissionLevel: 1,
      username: 'teste'
    })

    const status = await Status.create({
      status: 'Server ON'
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          status: status.status
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
        error,
        null,
        2
      ),
    };
  }
};
