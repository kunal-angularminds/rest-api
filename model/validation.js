let validatUser = (user)=> {

    const schema = Joi.object({
        name: Joi.string().required().min(6),
        email: Joi.string().required().min(6).email(),
        password: Joi.string().required().min(6)
    }).options({ abortEarly: false });

    return schema.validate(user);

}

module.exports.validatUser = validatUser;