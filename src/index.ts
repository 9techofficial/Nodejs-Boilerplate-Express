import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { logInfo } from './utilities/logger';

// Load the appropriate .env file based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${nodeEnv}` });

// implement express
const app = express();
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const port = process.env.PORT ?? 4000;

const server = http.createServer(app);
server.listen(port, () => logInfo.info(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${process.env.PORT}`));

// connect to MonogoDB Database
import { connectDB } from './utilities/db';
connectDB()

// Load routing files
import routes from './routes/routes';
app.use("/api/public", express.static('public'));
app.use('/api', routes());