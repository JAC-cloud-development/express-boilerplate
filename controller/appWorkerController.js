const model = require("../model/appWorkmodel")

module.exports = {
    createWorker: function(req,res)
    {
        let dati = req.body
        console.log({dati})
        model.createWorker(dati,(err)=>{
            if (err) 
            {
                res.send(JSON.stringify("errore"));
            }
            else
            {
                res.send({response:"creazione avvenuta", status:200}) 
            }

        })
    },
    getAllWorker: function(req,res)
    {
        model.getAllWorker((result)=>{
            res.send(result)
        })
    },

    getSingleWorker: function(req,res)
    {
        let id = req.query.id
        model.getSingleWorker(id,(result)=>{
            res.send(result)
        })
    },

    deleteWorker: function(req,res)
    {
        let id = req.body.id
        model.deleteWorker(id,(err)=>{
            if(err)
            {
                res.send("eliminazione worker fallita")
            }
            else
            {
                res.send("worker eliminata con successo")
            }
        })
    },

    updateWorker: function(req,res)
    {
        let dati = req.body
        model.updateWorker(dati,(err)=>{
            if(err)
            {
                res.send("fallito aggiornamento campi worker")
            }
            else
            {
                res.send("worker aggiornata con successo")
            }
        })
    }

}