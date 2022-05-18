import _ from 'lodash'
import { Router } from 'express';
import usersmodel from "../../api/users/model.js";
import jwt from "jsonwebtoken";   //va anche installata

const router = new Router();

router.post("/login", async function (request, response) {

  if(request.user!==undefined){//token valido --> mostra utente
    response.send(request.user);
  }else{
    const decoded = Buffer.from(request.headers.authorization.split(" ")[1], 'base64').toString('binary');
    const user= decoded.split(":")[0];
    const pass= decoded.split(":")[1];
    const trovato= await usersmodel.find({username: user, password: pass});
    /*console.log(a);
    const trovato= _.find(db.users.list(), (us)=>{
      if(user===us.username && pass===us.password){
        return true;
      }
    });
    console.log(trovato);*/
    if(trovato.length === 0 /*===undefined*/){
      response.sendStatus(401);
    }else{
      //ttrovato e' un array!
      const trovato2= trovato[0]; //non so se proprio giusto
      //console.log(trovato._id);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      response.send({
        token:
          jwt.sign({
                user: {
                  id: trovato2._id
                }
            }, 'secret'),
      });
    }
  }
});

export default router;