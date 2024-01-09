import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'; //archivo de rutas
// const bodyParser = require('body-parser'); 

const app=express();

app.use(router)
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json())

export default app

