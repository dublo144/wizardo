const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user');
const jwt = require('jsonwebtoken');
const { update } = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await UserModel.findOne({
        email: args.userInput.email
      });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPw = await bcrypt.hash(args.userInput.password, 12);
      const user = new UserModel({
        username: args.userInput.username,
        email: args.userInput.email,
        password: hashedPw
      });

      const savedUser = await user.save();
      return { ...savedUser._doc, password: null, id: savedUser.id };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  login: async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('User not found');
      throw new Error('Invalid credentials');
    }
    const authenticated = await bcrypt.compare(password, user.password);
    if (!authenticated) {
      console.log('Invalid password');
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.SECRET,
      {
        expiresIn: '1h'
      }
    );
    return {
      username: user.username,
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  },
  updateUser: async ({ updateUserInput }) => {
    try {
      return UserModel.findByIdAndUpdate(
        updateUserInput.userId,
        { ...updateUserInput },
        { new: true },
        (err, doc) => doc
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
