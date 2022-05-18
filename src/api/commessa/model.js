
import { Mongoose } from "mongoose";
const commessaSchema = new mongoose.Schema({
    nome: {
        type: String,
    },
    utenti:{
        type:Array
    },
    datainizio:{
        type:String
    },
    datafine:{
        type:String
    }
});





export default mongoose.model('commessa', commessaSchema);