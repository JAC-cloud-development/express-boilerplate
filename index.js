import express from 'express'
import users from './users/index.js'

const router = new Router();
const app = express()
const port = 3000



router.use('/users', users);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})