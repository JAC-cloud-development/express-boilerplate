// require the express module
import _ from 'lodash'
import { Router } from 'express';
//import { db } from '../../services/db/fakedb.js'
import validateJWT from '../../services/jwt/index.js'
import usersmodel from "./model.js";

const router = new Router();

router.get("/", validateJWT, async function (request, response) {
  const lista= await usersmodel.find();               //vero json
  return response.json(_.map(lista, (user) => _.omit(user.toJSON(), ['password', '__v'])));
});

router.get("/:id", validateJWT, async function (request, response) {
  const element= await usersmodel.find({_id: request.params.id});
  //const element = db.users.get(request.params.id);
  if(element.length===0){
    response.sendStatus(404);
  }else{
    //element array
    const e= element[0].toJSON();
    response.json(_.omit(e, ['__v', 'password']));
  }
  //return element ? response.json(_.omit(element, 'password')) : response.sendStatus(404);
});

router.post("/", validateJWT, async function (request, response) {
  
  //controlla errori --> se non ci sono tutti campi
  const user = new usersmodel({
         username: request.body.username,//'pluto'
         password: request.body.password//"plutoPassword"
        });
    
        await user.save();
  //db.users.insert(request.body);
  return response.sendStatus(201);
});

router.put("/:id", validateJWT, async function (request, response) {
  const trovato =(await usersmodel.find({_id: request.params.id}))[0];
  //gia preso oggetto non array

  //const nuovo= new usersmodel();
  //c'e' altro modo?
  if(request.body.username!==undefined){
    trovato.username=request.body.username;
  }
  if(request.body.password!==undefined){
    trovato.password=request.body.pass;
  }

  const fin= await usersmodel.findByIdAndUpdate(request.params.id, trovato);
  //db.users.update(request.params.id, request.body);
  //const element = _.find(db.users.list(), (i) => i.id.toString() === request.params.id)
  if(fin.length===0){//non c'e' piu
    response.sendStatus(404);
  }else{
    response.json(_.omit(fin.toJSON(), ['__v', 'password']));
  }
  //return element ? response.json(element) : response.sendStatus(404);
});

router.delete("/:id", validateJWT, async function (request, response) {
  await usersmodel.findByIdAndDelete(request.params.id);
  return response.sendStatus(204);
});

export default router;