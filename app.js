const express=require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const fs=require('fs');
const mongoose=require('mongoose');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var url='mongodb+srv://**:**@cluster0.7zx0w.mongodb.net/**?retryWrites=true&w=majority';

mongoose.connect( url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    (err,d)=>{
        if(err) return console.log(err);
        console.log("connected to mongodb..") 
    }
    ); 

var msg=mongoose.model('messages',{
      name:String,
      message:String,
      time:String
});

app.set('view engine','ejs');

  app.post('/messages', (req, res) => {
      var obj={
          name:req.body.name,
          message:req.body.message,
          time:req.body.time
      }
      msg.create(obj,(err,d)=>{
          if(err) return console.log(err);
          console.log(d)
      })
  })

  app.get('/messages', (req, res) => {
    msg.find({},(err,data)=>{
         if(err) return console.log(err);

         console.log(data.length);
         console.log(data);
         res.send(data);
    })
 })

app.get("/",(req,res)=>{
    // msg.remove({},(err,result)=>{
    //     if(err) return console.log(err);

    //     console.log(result);
    // })
    res.render('index');
});

app.listen(4545,()=>{
    console.log("server connected.....to 4545")
})