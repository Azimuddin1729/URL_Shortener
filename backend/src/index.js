const express= require('express')
const cors= require('cors');


const app= express()
app.use(cors())
app.use(express.json())


const router = require('./routes');
app.use("/api/v1",router);

app.listen(3001);

