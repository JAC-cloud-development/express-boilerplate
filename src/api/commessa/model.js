import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: { type: String },
    datainizio: { type: String },
    utenti: { type: Array },
    
});

export default mongoose.model('Item', itemSchema);