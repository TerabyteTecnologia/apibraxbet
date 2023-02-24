require('dotenv').config();
const crypto = require("crypto");
const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16;
const password = process.env.APP_SECRET_KEY_BOOT;
const key = crypto.scryptSync(password, 'salt', 32);


exports.encrypt = async (text) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted,cipher.final()])
    console.log(`${iv.toString('hex')}:${encrypted.toString('hex')}`)
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}
exports.decrypt = async (iv,text) => {
    const ivBuffer = Buffer.from(iv,'hex');
    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(key), ivBuffer);
    let content = decipher.update(Buffer.from(text,'hex'));
    content = Buffer.concat([content,decipher.final()])
    return content.toString();

   
}




