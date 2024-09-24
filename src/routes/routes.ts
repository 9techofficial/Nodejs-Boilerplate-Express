import express from 'express';
import { login, register } from '../controllers/authController';
import baseRoutes from '../framework/baseRoute';
import authRoutes from './authRoutes';

const router = express.Router();
export default ():express.Router => {
  // authentication routes
  router.post('/register', register);
  router.post('/login', login);

  // single route  
  router.get('/', async (req, res) => { res.send({ hello: 'world' }); });

  // CRUD routes
  baseRoutes(router, 'todo', 'todoController');

  // Authentication routes
  authRoutes(router);

  // return routes
  return router;
}