const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const CustomError = require('../utils/error');

exports.authenticate = async (req, res, next) => {
  try {
    // get request headers
    // const headers = req.headers;
    // console.log(headers);

    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      //authorization ถ้าใช้เป็น token ต้องขึ้นต้นด้วย Bearer เสมอ
      return res.status(401).json({
        message: 'You are Unauthorized',
      });
    }

    const token = authorization.split(' ')[1]; //ตัดตัว Bearer ที่มี ' ' ต่อท้ายออก เหลือแต่ token

    if (!token) {
      return res.status(401).json({
        message: 'You are Unauthorized',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //decode = {id:,email:,username:}
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'You are Unauthorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      // return res.status(400).json({ message: 'Passwords do not match' });

      throw new CustomError('Passwords do not match', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10); //10 คือ salt
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User account has been created' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { username, email, password } = req.body;
    //select * from users where username = username , password = password , email = email
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      //  if(user === null)
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {
      // expiresIn: '30d',
      expiresIn: 5,
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};
