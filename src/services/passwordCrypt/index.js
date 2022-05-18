import md5 from 'md5'
import cryptoRandomString from 'crypto-random-string'

export function hashPassword(clearPassword) {
    var salt = cryptoRandomString(10);
    return { passwordToSave: md5(clearPassword + salt), salt: salt }
}

export function checkPassword(clearPassword, md5Password, salt) {
    //console.log(md5(clearPassword + salt),salt, md5Password)
    console.log("md5==>",md5(clearPassword + salt)," salt ",salt," md5 password ",md5Password)
    //console.log(md5(clearPassword + salt),salt, md5Password)
    return md5(clearPassword + salt) === md5Password
}