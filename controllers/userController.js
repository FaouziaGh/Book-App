require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, userRegistrationSchema, userLoginSchema } = require('../models/user.js');
const signUp = async (req, res) => {
    try {
      // Validate request body with Joi schema
      const { error } = userRegistrationSchema.validate(req.body);
      if (error) {
        return res.status(400).send({ error: error.details[0].message });
      }
      // Hash the password with bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      await user.save();
      //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(201).send({ user });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  };

const login = async (req, res) => {
  try {
    // Validate request body with Joi schema
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid login credentials');
    }
    const token = jwt.sign({ email:user.email }, process.env.JWT_SECRET, { expiresIn: '1800s'});
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = { signUp, login };
