import express from 'express'
import {route} from './routes/register.routes'
import {route1} from './routes/login.routes'
import {route2} from './routes/addAPI.routes'
import { route3 } from './routes/mainCheck.routes'

const PORT:number=3000

const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello')
})
app.post('/submit',route)
app.post('/login',route1)
app.post('/add-api',route2)
app.post('/mainChecker',route3)
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})


