import _ from 'lodash'
import { Router } from 'express';
import commessa from './model.js'
import validateJWT from '../../services/jwt/index.js'

const router = new Router();

router.get("/", validateJWT, async function (request, response, next) {
  try {
    return response.json(await commessa.find());
  } catch (e) {
    next(e)
  }
});