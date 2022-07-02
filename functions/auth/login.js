const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { email, password } = body;
  try {
    const user = await User.findOne({
        where: {email: email}
    })
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'User doenst exist'
        })
      }
    }
    const hash = bcrypt.hashSync(password, user.passwordHash);
    if (hash != user.passwordHash) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Error user/password'
        })
      }
    }
    const accessToken = jwt.sign(
      { login: user.id },
      process.env.SECRET,
      { expiresIn: 86400 },
    );
    user.passwordHash = undefined;
    return ({
      statusCode: 200,
      body: JSON.stringify({
        user: user,
        accessToken: accessToken
      })
    })
  } catch (error) {
      console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: error,
        },
      ),
    };
  }
};