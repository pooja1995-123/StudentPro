//step-1:import
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
const Student=require("./models/Students");


//step-2:db connection
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/students");
mongoose.connection.on("connected",()=>{
    console.log("database is connected");
})
mongoose.connection.on("error",()=>{
    console.log("error occured");
})

// step-3:middleware

app.use(cors());
app.use(express.json())

//step-4:routes
app.get("/",(req,res)=>{
    Student.find()
    .exec()
    .then((result)=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
})
app.post("/students",(req,res)=>{
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const student=new Student({
        _id:new mongoose.Types.ObjectId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        place:req.body.place
    }); 
    student.save()
    .then((result)=>{
        console.log(result);
        res.status(200).json({msg:"successfully submitted"});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"error occured"});
    })
})
    app.delete("/student/:id",(req,res)=>{
        const id=req.params.id;
        Student.remove({_id:id},(err,result)=>{
            if(err)
            {
                console.log(err);
                res.status(500).send("error occured");
            }
            else{
                res.status(200).json({msg:"successfully deleted"});
            }
        })

    })
    app.put("/student/:id",(req,res)=>{
        const firstname=req.body.firstname;
        const lastname=req.body.lastname;
        const place=req.body.place;
        const id=req.params.id;
        Student.update({_id:id},{$set:{firstname:firstname,lastname:lastname,place:place}})
        .then((result)=>{
            console.log(result);
            res.status(200).json({msg:"successfully updated"});
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({msg:"erroer occured"});
        })
    })

//step-5:server is running
app.listen(5000,()=>{
    console.log("Server is running")
})














