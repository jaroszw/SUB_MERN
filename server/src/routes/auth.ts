import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/signup',

  //password and email validation
  body('email').isEmail().withMessage('Email field must be a valid email'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Must be at least 5 chars long'),

  //proper request handler
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return { msg: error.msg };
      });

      return res.json({ errors, data: null });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.json({
        errors: [{ msg: 'Email already in use' }],
        data: null,
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    //set expiry to 1 month
    // let d = new Date();
    // d.setDate(d.getDate() + 30);

    // res.cookie('ciacho', token, {
    //   expires: d,
    //   httpOnly: true,
    //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    //   sameSite: 'none',
    // });

    // res.status(200).json({
    //   status: 'success',
    //   token,
    //   data: { email: newUser.email },
    // });

    res.json({
      errors: [],
      data: { token, user: { id: newUser._id, email: newUser.email } },
    });
  }
);

router.post(
  '/login',
  body('email').isEmail().withMessage('Email field must be a valid email'),
  async (req: express.Request, res: express.Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return { msg: error.msg };
      });

      return res.json({ errors, data: null });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.json({
        errors: [{ msg: 'Invalid credentials' }],
        data: null,
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({
        errors: [{ msg: 'Invalid credentials' }],
        data: null,
      });
    }

    // res.json({ user });

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.json({
      errors: [],
      data: { token, user: { id: user._id, email: user.email } },
    });
  }
);

export default router;
