const mongoose = require('mongoose');
const Task = require('../models/taskModel');


const getAllTasks = async (req, res) => {
  const user = req.user;
  try {
    const tasks = await Task.find({ user: user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks)
  } catch (error) {
    console.log("error at get all tasks ", error.message);
    res.status(400).json({ msg: error.message })
  }
}

const addTask = async (req, res) => {

  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ msg: "title needed" })
  }
  if (!req.user) {
    return res.status(401).json({ msg: "Unauthorized : user not found" })
  }

  try {
    const task = await Task.create({ user: req.user._id, title, description })
    res.status(200).json({
      msg: "Task Added Successfully",
      task
    })
  } catch (error) {
    console.log('error at addTask ', error.message);
    res.status(400).json({ msg: error.message })
  }

}
const updateTask = async (req, res) => {
  const taskId=req.params.id;
  const {title,description,status}=req.body;
  console.log(status)
  try {
     const task=await Task.findById(taskId);
     if(!task) return res.status(400).json({msg:"task not found"})
      if(task.user.toString()!==req.user._id.toString()){
          return res.status(400).json({msg:"this task is wrong one"})
      }

      task.title=title||task.title;
      task.description=description||task.description;
      task.status=status?true:false;

      await task.save();
      console.log(task)
      res.status(200).json({msg:"task updated",task})

  } catch (error) {
    console.log(error.message);
    res.status(400).json({msg:error.message})
  }
}
const deleteTask = async (req, res) => {
  console.log("hii")
   const taskId=req.params.id;
   const task=await Task.findByIdAndDelete(taskId);
   res.status(200).json({msg:"deleted",task})
}

module.exports = { addTask, getAllTasks, updateTask, deleteTask };