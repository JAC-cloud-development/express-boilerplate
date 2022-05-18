import _ from 'lodash'
import { Router } from 'express';
import ItemsCommesse from './model.js'
import validateJWT from '../../services/jwt/index.js'

const router = new Router();

router.get("/", validateJWT, async function (request, response) {
  return response.json(await ItemsCommesse.find());
});

router.get("/:id", validateJWT, async function (request, response) {
  const element = await ItemsCommesse.findOne({ _id: request.params.id });
  return element ? response.json(element) : response.sendStatus(404);
});

router.post("/", validateJWT, async function (request, response) {
  return response.json(await ItemsCommesse.create(request.body));
});

router.put("/:id", validateJWT, async function (request, response) {
  const element = await ItemsCommesse.findOne({ _id: request.params.id });
  if (element) {
    element.set(request.body)
    await element.save();
  }
  return element ? response.json(element) : response.sendStatus(404);
});

router.delete("/:id", validateJWT, async function (request, response) {
  const result = await ItemsCommesse.deleteOne({ _id: request.params.id });
  return result.deletedCount > 0 ? response.sendStatus(204) : response.sendStatus(404);
});

export default router;