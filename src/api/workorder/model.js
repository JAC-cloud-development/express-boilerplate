import mongoose from 'mongoose'

const workorderSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    nome: {
        type: String,
        minlength: 3
    },
    dataInizio: {
        type: Date
    },
    dataFine: {
        type: Date
    },
    persone: [{ 
        numero: String, 
        ruolo: String,
        qualifica: String
     }],
     supervisore: {
        type: Date
    },
    calendario: {
        type: String
    },
    stima: {
        type: Number
    },
    budget: {
        type: Number
    },
    linguaggio: {
        type: String
    }
});

export default mongoose.model('Workorder', workorderSchema);