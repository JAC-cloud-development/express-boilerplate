import _ from 'lodash'
import { Router } from 'express';
import ItemsCommesse from './model.js'
import validateJWT from '../../services/jwt/index.js'

const router = new Router();

router.get("/", validateJWT, async function (request, response) {
  if(request.user.ruolo && request.user.ruolo=="admin"){
    return response.json(await ItemsCommesse.find());
  }else{
    response.sendStatus(401);
  }
});

router.get("/:id", validateJWT, async function (request, response) {
  const element = await ItemsCommesse.findOne({ _id: request.params.id });
  return element ? response.json(element) : response.sendStatus(404);
});

router.post("/", validateJWT, async function (request, response) {
  console.log("\n\n\nAdding a New Element:\n")
  console.log(request.body);
  return response.json(await ItemsCommesse.create(request.body));
});

router.put("/:id", validateJWT, async function (request, response) {
  console.log("\n\n\nUpdating an Element:\n")
  console.log(request.body);
  const element = await ItemsCommesse.findOne({ _id: request.params.id });
  if (element) {
    element.set(request.body);
    await element.save();
  }
  return element ? response.json(element) : response.sendStatus(404);
});


router.put("/adduser/:id", validateJWT, async function (request, response) {
  console.log("\n\n\nAdding an User to Commesse:\n")
  const element = await ItemsCommesse.findOne({ _id: request.params.id });
  if (element) {
    const e = element.idPersone;
    e.push(request.body.idPersona);
    console.log(element.idPersone);
    element.set(element.idPersone);
    //    element.set(request.body);
    element.set(element.personeEffettive = element.personeEffettive + 1);
    console.log(element);
    await element.save();
  }
  return element ? response.json(element) : response.sendStatus(404);
});



router.put("/deleteuser/:id", validateJWT, async function (request, response) {
  console.log("\n\n\nDelete an User from Commesse:\n")
  console.log(request.body);
  const element = await ItemsCommesse.findOne({ _id: request.params.id });
  if (element) {
    const e = element.idPersone;

    const index = e.indexOf(request.body.id);
    console.log(index);

    e.splice(index, 1);

    element.set(element.idPersone);
    element.set(element.personeEffettive = element.personeEffettive - 1);

    //element.set(request.body);
    await element.save();
  }
  return element ? response.json(element) : response.sendStatus(404);
});


router.delete("/:id", validateJWT, async function (request, response) {
  console.log("\n\n\nDelete an Element:\n")
  console.log(request.body);
  const result = await ItemsCommesse.deleteOne({ _id: request.params.id });
  return result.deletedCount > 0 ? response.sendStatus(204) : response.sendStatus(404);
});

export default router;