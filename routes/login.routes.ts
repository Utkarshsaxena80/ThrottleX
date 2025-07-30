import express from 'express'
const route1=express.Router()
import { loginController } from '../controllers/login.controller'

route1.post('/login',loginController)

export {route1}
