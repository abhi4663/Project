import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv';
import express from 'express';

import noteRouter from './src/routes/noteRoutes';
import { userRouter } from './src/routes/userRouter';

const configureEnvironment = () => {
  env.config();
};

async function connectToDatabase() {
  const connstr = 'mongodb://localhost:27017/notes-app';
  console.log('initializing DATABASE connection...');
  mongoose.connection.on('error', (err: any) =>
    console.log('mongoose error : ', err.message)
  );
  await mongoose.connect(connstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('Connected to DATABASE');
}

const startServer = async () => {
  configureEnvironment();
  await connectToDatabase();

  const app = express();
  app.use(cors());
  app.use(express.json());

  const server = app.listen(process.env.PORT);
  server.on('error', (error: any) =>
    console.log('server error : ', error.message)
  );
  app.use('/api/notes', noteRouter);
  app.use('/api/user', userRouter);
};

startServer()
  .then(() => {
    console.log(`server started on port ${process.env.PORT}`);
  })
  .catch((error: any) => {
    console.log('error on starting server : ', error.message);
  });
