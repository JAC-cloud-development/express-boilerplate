const mongo = require("mongoose")
const workerSchema = {
    workerId:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    surname:{type:String, required:true},
    role:{type:String, required: true}
}

const schemaCommesse = mongo.Schema({
    id:{type:String, required:true, unique:true},
    status:{type: String, required:true},
    startdate:{type:String, required:true},
    finishDate:{type:String, required:true},
    budget: {type: Number, required:true}
})

const commessa = mongo.model("commessa",schemaCommesse) 

module.exports ={
    createCommessa: function(dati,callback)
    {
        let newComm = new commessa(
            {
                id:dati.id, 
                status:dati.status, 
                startdate:dati.startdate,
                finishDate:dati.finishdate,
                budget:dati.budget
            }) 
            newComm.save((err,result)=>
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

    getAllcommessa: function(callback)
    {
        commessa.find({},(err,data)=>{
            let result = data
            console.log("result:",result)
            callback(result)
        })
    },

    getSingleCommessa: function(id,callback)
    {
        commessa.find({id:id},(err,data)=>{
            if(err) console.log({err})
            let result = data
            callback(result)
        })
    },

    deleteCommessa: function(id,callback)
    {
        commessa.findOneAndDelete({id:id},(err)=>{
            if(err) console.log({err})
            callback()
        })
    },

    updateCommessa: function(dati,callback)
    {
       commessa.findOne({id:dati.id},(err,res)=>{
           if(err) console.log(err)
        res.set(dati)
        res.save()
       })
       callback()
    }

}