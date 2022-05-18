const model = require("../model/appModels")

module.exports = {
    createCommessa: function(req,res)
    {
        let dati = req.body
        console.log({dati})
        model.createCommessa(dati,(err)=>{
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
    getAllCommessa: function(req,res)
    {
        model.getAllcommessa((result)=>{
            res.send(result)
        })
    },

    getSingleCommessa: function(req,res)
    {
        let id = req.query.id
        model.getSingleCommessa(id,(result)=>{
            res.send(result)
        })
    },

    deleteCommessa: function(req,res)
    {
        let id = req.body.id
        model.deleteCommessa(id,()=>{
            res.send("commessa eliminata con successo")
        })
    },

    updateCommessa: function(req,res)
    {
        let dati = req.body
        model.updateCommessa(dati,()=>{
            res.send("commessa aggiornata con successo")
        })
    }

}