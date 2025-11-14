const mongoose=require('mongoose');

const dbConnection=async()=>{
 
  try {
     const connect=await mongoose.connect(process.env.MONGO_URI);
     console.log("Db connection successfull ",connect.connection.host)
  } catch (error) {
    console.log(error.message)
  }

}

module.exports={dbConnection};