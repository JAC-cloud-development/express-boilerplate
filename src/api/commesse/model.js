import mongoose from 'mongoose'

const itemCommesse = new mongoose.Schema({
    name: { type: String },
    idSuperv: { type: mongoose.ObjectId },

    dataInizio: {type: Date},
    dataFine: {type: Date},

    attiva: {type: Boolean},

    personePreviste: {type: Number},
    personeEffettive: {type: Number},
    idpersone: [{ type: mongoose.ObjectId }],
});

export default mongoose.model('Commesse', itemCommesse);