'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')
const Logger = use('Logger');

class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async createUser({ request, response, auth }) {
    Logger.info('Test log endpoint hit');

    try {
      const { email, password } = request.all();

      const validation = await validate(request.all(), {
        email: 'required|email|unique:users',
        password: 'required'
      })

      if (validation.fails()) {
        return response.status(400).json(validation.messages());
      }

      const user = new User();
      user.email = email;
      user.password = password;
      await user.save();

      const token = await auth.generate(user);

      return {
        status: 'success',
        message: 'User created successfully',
        data: user,
        token
      };

    } catch (error) {
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
      return response.status(500).json({ status: 'error', message: 'Something went wrong!' });
    }
  }
}

module.exports = UserController;