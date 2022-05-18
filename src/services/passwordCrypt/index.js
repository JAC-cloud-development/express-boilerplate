import bcrypt from "bcrypt";

export async function hashPassword(clearPassword) {
    let salt = await bcrypt.genSalt(10);
    return { passwordToSave: await bcrypt.hash(clearPassword, salt) };
}

export async function checkPassword(clearPassword, hashPassword) {
    return await bcrypt.compare(clearPassword, hashPassword);
}
