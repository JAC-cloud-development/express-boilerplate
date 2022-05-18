import jwt from 'jsonwebtoken';
import 'dotenv/config';

//middleware for autentication
async function autenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    //take the token from header
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null) return res.status(401).send("Token not found");
    //verify if the token exist using a secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(403).send("No access.")
        //send user obj to the next step
        req.user = user;
        next();
    })
}

export {autenticateToken}