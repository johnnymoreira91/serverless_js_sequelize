"use strict";
const Account = require('../models/Account');
const Address = require('../models/Address');
const Bank = require('../models/Bank');
const BankBranch = require('../models/BankBranch');
const database = require('../models/BaseModel');
const Permission = require('../models/Permission');
const Status = require('../models/Status');
const User = require('../models/User');
const {flushCache} = require('./cache')

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
  try {
    // await database.connection.query(`CREATE DATABASE ourBank2;`)
    await flushCache()
    await database.connection.drop()
    await database.connection.sync({force: true})
    await Address.sync()
    await Permission.sync()
    await User.sync()
    await Status.sync()
    await Bank.sync()
    await BankBranch.sync()
    await Account.sync()

    // await Permission.create({
    //   name: 'User',
    //   level: 0
    // })
    // await Permission.create({
    //   name: 'Func',
    //   level: 1
    // })
    // await Permission.create({
    //   name: 'Func2',
    //   level: 2
    // })
    // await Permission.create({
    //   name: 'Manager',
    //   level: 3
    // })
    // await Permission.create({
    //   name: 'CEO',
    //   level: 4
    // })
    // await Permission.create({
    //   name: 'PO',
    //   level: 5
    // })
    // await Permission.create({
    //   name: 'Dev',
    //   level: 6
    // })

    // const address = await Address.create({
    //   zipcode: '00000-000',
    //   street: 'Manoel Leiroz',
    //   number: '210',
    //   complement: 'B-137'
    // })

    // await User.create({
    //   firstName: 'Johnny',
    //   lastName: 'Moreira',
    //   email: 'johnnymoreira91@hotmail.com',
    //   password: 'teste',
    //   permissionLevel: 1,
    //   username: 'teste',
    //   addressId: address.id
    // })

    // await Bank.create({
    //   name: 'ourBank'
    // })

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
