// require the express module
import _ from 'lodash'
import { Router } from 'express';
import Items from './model.js'
import validateJWT from '../../services/jwt/index.js'

const router = new Router();

router.get("/", validateJWT, async function (request, response, next) {
  try {
    return response.json(await Items.find().populate('userId'));
  } catch (e) {
    next(e)
  }
});

router.get("/:id", validateJWT, async function (request, response, next) {
  try {
    const element = await Items.findOne({ _id: request.params.id });
    return element ? response.json(element) : response.sendStatus(404);
  } catch (e) {
    next(e)
  }
});

router.post("/", validateJWT, async function (request, response, next) {
  try {
    return response.json(await Items.create(request.body));
  } catch (e) {
    next(e)
  }
});

router.put("/:id", validateJWT, async function (request, response, next) {
  try {
    const element = await Items.findOne({ _id: request.params.id });
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
    const result = await Items.deleteOne({ _id: request.params.id });
    return result.deletedCount > 0 ? response.sendStatus(204) : response.sendStatus(404);
  } catch (e) {
    next(e)
  }
});

export default router;