
const Joi = require('joi');

let registerUser = (data)=>{
    const schema = Joi.object({
        name:Joi.string().required().min(6),
        email:Joi.string().required().email().min(6),
        password:Joi.string().required().min(6)
    })

    return schema.validate(data);
}

let loginValidation = (data)=>{
    const schema = Joi.object({
        email:Joi.string().required().email().min(6),
        password:Joi.string().required().min(6)
    })

    return schema.validate(data);
}

module.exports.registerUser = registerUser;
module.exports.loginValidation = loginValidation;