import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

import { registerValidation, loginValidation, postCreateValidation, commentCreateValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';

dotenv.config({ path: `.env` });                                                                 // connect DB

mongoose
  .connect(
    `${process.env.MONGO_URL}`,
      {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(cors());
app.use(fileUpload({}))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);           // endpoint for login
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);  // endpoint for registration
app.get('/auth/me', checkAuth, UserController.getMe);                                             // endpoint for auth

app.get('/appointments', PostController.getAll);                                                  // endpoint to get all appointments for doctor
app.get('/appointments/:fullName', PostController.getAppointmentsByFullName);                     // endpoint to get all appointments for patient

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server Ok');
});
