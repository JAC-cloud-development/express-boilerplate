import _ from "lodash";
import jwt from "jsonwebtoken";
//import {db} from "../db/fakedb.js";
import usersmodel from "../../api/users/model.js";

async function validateJWT(req, res, next){

  if(req.headers.authorization===undefined){//se non c'e token? non autorizz
    res.sendStatus(401);
  }else{
    if(jwt.decode(req.headers.authorization.split(" ")[1], 'secret')===null){
      next();   //??? xke ho fatto cosi'?!
    }else{
      var decoded = jwt.verify(req.headers.authorization.split(" ")[1], 'secret');
      const cercato= await usersmodel.find({ _id: decoded.user.id.toString()});
      /*const cercato= _.find(db.users.list(), (us)=>{
        if(decoded.user.id.toString() === us.id.toString()){
          return true;
        }
      });*/

      if(cercato===undefined){
        res.sendStatus(401);
      }else{

        //cercato e' array
        let cercato2= cercato[0]; //mmmm

        //ma xke omit non funziona?!!??!?!!?!?  
        //sulle risposte di mongoose 

        /*
        cercato2=cercato2.toJSON();//bisogna trasformarlo in vero json
        cercato2=_.omit(cercato2, ['_id', '__v']);*/

        //oppure
        cercato2=_.pick(cercato2, ['username', 'password']);
        
        req.user= cercato2;
        next();
      }
    }
  }
}

export default validateJWT;