
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export function ensureToken(req, res, next) {
  const token = req.cookies.token; 
  if (token) {
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

export function verifyToken(req, res) {
  jwt.verify(req.token, SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ text: 'protected', data });
    }
  });
}
