import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User';

const router = express.Router();

router.post(
  '/signup',

  //password and email validation
  body('email').isEmail().withMessage('Must be en email'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'),

  //proper request handler
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return { [error.param]: error.msg };
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

    const newUser = await new User({
      email: email,
      password: password,
    });

    const savedUser = await newUser.save();
    res.json({ message: 'Tutto va benne', savedUser });
  }
);

export default router;
