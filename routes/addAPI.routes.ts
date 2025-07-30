import express from 'express'
const route2=express.Router()
import { addApi } from '../controllers/add-api.controller'
import { authenticateRoute } from '../middleware/authentication.middleware'

route2.post('/add-api',authenticateRoute(),addApi)
export {route2}