const express=require('express');
const dotenv=require('dotenv').config();
const {dbConnection}=require('./config/db')
const cors=require('cors');
const userRoutes =require('./routes/userRoutes')
const taskRoutes=require('./routes/taskRoutes')

const app=express();
dbConnection()

const allowedOrigins = [
  "https://daily-task-tracker-react-iota.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"] 
}));


app.options(/.*/, cors());



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