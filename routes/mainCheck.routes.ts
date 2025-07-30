
import express from 'express'
const route3=express.Router()
import { mainCheck } from '../middleware/main.middleware'
import { mainEntry } from '../controllers/mainEntry.controller'
//this is also a protected route 
route3.post('/mainChecker',mainCheck(),mainEntry)


export{route3}