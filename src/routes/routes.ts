import express from 'express';
import baseRoutes from '../framework/baseRoute';
import { isAuth } from '../middlewares/authMiddleware';
import { login, register } from '../controllers/authController';

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
  baseRoutes(router, 'user', 'userController', isAuth);

  // return routes
  return router;
}