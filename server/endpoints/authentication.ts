import { Router } from 'express';
import bcrypt from 'bcrypt';
import timeout from '../middleware/timeout';
import { users } from '../data';
import { addToken, removeToken, getTokenOwner, generateToken } from '../services/tokenManager';

const router = Router();

// if password and email is correct returns new token
router.post('/api/login', timeout, (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && bcrypt.compareSync(password, user.password),
  );

  if (user) {
    const token = generateToken();

    addToken(token, user.id);

    res.status(200).json({
      id: user.id,
      email: user.email,
      token,
    });

    return;
  }

  res.status(401).send({ error: { message: 'Username or password incorrect' } });
});

// deletes token
router.delete('/api/logout', (req, res) => {
  const token = req.headers.authorization?.split(' ')?.[1];

  if (token) {
    removeToken(token);
    res.status(200).send();
    return;
  }

  res.status(401).send();
});

// return token owner info
router.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')?.[1];

  if (token) {
    const tokenOwnerId = getTokenOwner(token);

    if (tokenOwnerId) {
      const tokenOwner = users.find((user) => user.id === tokenOwnerId);

      res.status(200).json({
        id: tokenOwner.id,
        username: tokenOwner.username,
        email: tokenOwner.email,
      });

      return;
    }
  }

  res.status(401).send({ error: { message: 'Invalid token' } });
});

export default router;
