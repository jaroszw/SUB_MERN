import express from 'express';

const router = express.Router();

router.post('/signup', async (req, res) => {
  res.send('SIGNUP ROUTE');
});

export default router;
