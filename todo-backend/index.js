const express = require("express");
const port = 3500;
const app = express();
const mongoose=require('mongoose')
const cors=require('cors')

app.use(express.json());
app.use(cors());

//mongodb connection
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>{
    console.log("db connected successfully")
})
.catch((err)=>{
    console.error(err)
})
//creating schema
const todoschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})
//create model
const todomodel=mongoose.model('todo',todoschema);

let idCounter = 1; // Unique counter for generating IDs
//create
app.post('/todos',async(req, res) => {
    const { title, description } = req.body;
    try{
    const newtodo=new todomodel({title,description})
     await newtodo.save()
     res.status(201).json(newtodo);
    }
    catch(err){
       console.log(err)
       res.status(500).json(err.message)
    }
    
});
//get from db
app.get('/todos', async(req,res)=>{
    try{
        const todo=await todomodel.find()
        res.json(todo)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
})
//update a data in db

app.put('/todos/:id',async(req,res)=>{
    try {
        const { title, description } = req.body;
        const id=req.params.id;
        const updatedtodo= await todomodel.findByIdAndUpdate(
        id,
        {title,description},
        {new:true}
     )
     if(!updatedtodo){
        return res.status(404).json("there is no id like that")
     }
     res.json(updatedtodo)
     console.log("updated successfully")
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
    
})
//delete
app.delete('/todos/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const deletetodo=await todomodel.findByIdAndDelete(id)
        if(!deletetodo){
            res.status(404).json("there is no id like that ")
        }
        res.status(204).end()
        console.log("deleted successfully")
        
    } catch (err) {
        res.status(500).json(message.err)
        
    }
  
})
app.listen(port, () => {
    console.log(`Server running in mode on port ${port}`);
  });
