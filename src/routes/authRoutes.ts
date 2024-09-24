import express from 'express';
import { isAuth } from "../middlewares/authMiddleware";
import baseRoutes from "../framework/baseRoute";

export default async function authRoutes(router: express.Router) {
  // // Routes
  // baseRoutes(router, 'user', 'userController');
}