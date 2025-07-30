import express from 'express'
import { Request,Response } from 'express';
import { registerController } from '../controllers/register.controllers';
const route=express.Router();

route.post('/submit',registerController);
export { route };