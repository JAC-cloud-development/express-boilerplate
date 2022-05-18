// require the express module
import _ from 'lodash'
import { Router } from 'express';
import commesse from './model.js'
import validateJWT from '../../services/jwt/index.js'

const router = new Router();

router.get("/", validateJWT, async function (request, response, next) {
  try {
    return response.json(await commesse.find().populate('nome'));
  } catch (e) {
    next(e)
  }
});

router.get("/:nome", validateJWT, async function (request, response, next) {
  try {
    const element = await commesse.findOne({ nome: request.params.nome });
    return element ? response.json(element) : response.sendStatus(404);
  } catch (e) {
    next(e)
  }
});

router.post("/", validateJWT, async function (request, response, next) {
  try {
    return response.json(await commesse.create(request.body));
  } catch (e) {
    next(e)
  }
});

router.put("/:id", validateJWT, async function (request, response, next) {
  try {
    const element = await commesse.findOne({ nome: request.params.nome });
    if (element) {
      element.set(request.body)
      await element.save();
    }
    return element ? response.json(element) : response.sendStatus(404);
  } catch (e) {
    next(e)
  }
});

router.delete("/:id", validateJWT, async function (request, response, next) {
  try {
    const result = await commesse.deleteOne({ nome: request.params.nome });
    return result.deletedCount > 0 ? response.sendStatus(204) : response.sendStatus(404);
  } catch (e) {
    next(e)
  }
});

export default router;