const express = require("express")
const dotenv= require("dotenv")
const bodyParser = require('body-parser');
const productRoute = require('./routes/ProductRoute')

dotenv.config();

const app= express();

app.use(bodyParser.json())

app.use('/api',productRoute)


const port = process.env.PORT || 4000

app.get('/',(req,res)=> {
  req.send("HOme page this is ")

})

app.listen(port,()=>{
  console.log(`server is running on Port : ${port}`);
})