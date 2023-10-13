const express = require('express')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
   cors()
    next();
  });
  app.options('/delete', cors());
const mongoose=require('mongoose')
const url="mongodb+srv://karthivicky:VF5aF0KsGI5pUPAl@workoutapi.giighg8.mongodb.net/?retryWrites=true&w=majority"
const mongo=mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connected to mongo');
}).catch((err)=>{
    console.log(err);
})
const event=new mongoose.Schema({
    eventName:String,
    speaker:String,
    schedule:String
})
const useEvents=mongoose.model('EMD',event)
app.get('/',async (req,res)=>{
    const data= await useEvents.find();
    res.json(data)
})
app.post('/insert',async (req,res)=>{
    const newEvents= new useEvents(req.body)
    newEvents.save()
    res.json(newEvents)
})
app.put('/update',async(req,res)=>{
    const updateEvents=await useEvents.findOneAndUpdate({eventName:req.body.events},req.body.data,{ new: true })
    res.json(updateEvents)
})
app.delete('/delete',async(req,res)=>{
    const deleteEvents=await useEvents.deleteOne({eventName:req.body.events})
    res.json(deleteEvents)
})

app.listen(3000)