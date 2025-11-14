const express=require('express');
const dotenv=require('dotenv').config();
const {dbConnection}=require('./config/db')
const cors=require('cors');
const userRoutes =require('./routes/userRoutes')
const taskRoutes=require('./routes/taskRoutes')

const app=express();
dbConnection()

app.use(cors({
  origin:"*"
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT=process.env.PORT || 5000;

app.use('/api/users',userRoutes)
app.use('/api/tasks',taskRoutes)

app.get('/',(req,res)=>{
  res.json("Hello welcome , Swamy")
})


app.listen(PORT,()=>{
  console.log(`server started and running at http://localhost:${PORT}`);
})