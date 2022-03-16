import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import socketIO from 'socket.io';
import envData from './configs/envData';
import v1Routes from './routes/api/v1';
import { generalErrorHandler, notFoundHander } from './utilities/errorHandler';

dotenv.config();

const app = express();
export const socketServer = http.createServer(app);

const corsOptions = {
  credentials: true,
  methods: 'GET,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json({
  limit: envData.MAX_FILE_SIZE
}));

app.use(v1Routes);

app.use(notFoundHander);
app.use(generalErrorHandler);

export const io = socketIO(socketServer);
io.origins('*:*');

/* eslint-disable-next-line */
socketServer.listen(envData.PORT, () => console.log(`App Listening on port ${envData.PORT}`));
export default app;
