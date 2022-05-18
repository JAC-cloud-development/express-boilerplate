const mongo = require("mongoose")

const workerSchema = {
    workerId:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    surname:{type:String, required:true},
    role:{type:String, required: true}
}

const worker = mongo.model("worker",workerSchema) 
module.exports ={
    createWorker: function(dati,callback)
    {
        let newWork = new worker(
            {
                workerId:dati.id, 
                name:dati.name, 
                surname:dati.surname,
                role:dati.role
            }) 
            newWork.save((err,result)=>
            {
                if(err)
                {
                    console.log("errore:", err)
                    callback(err)
                }
                else
                {
                    console.log("result:", result)
                    callback()
                }
            })
    },

    getAllWorker: function(callback)
    {
        commessa.find({},(err,data)=>{
            let result = data
            console.log("result:",result)
            callback(result)
        })
    },

    getSingleWorker: function(id,callback)
    {
        commessa.find({id:id},(err,data)=>{
            if(err) console.log({err})
            let result = data
            callback(result)
        })
    },

    deleteWorker: function(id,callback)
    {
        commessa.findOneAndDelete({id:id},(err)=>{
            if(err) console.log({err})
            callback()
        })
    },

    updateWorker: function(dati,callback)
    {
       commessa.findOne({id:dati.id},(err,res)=>{
           if(err) console.log(err)
        res.set(dati)
        res.save()
       })
       callback()
    }
}