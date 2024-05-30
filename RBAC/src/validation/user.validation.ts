import Joi from "joi";

export const userSchema = {
    create:{
        body:Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required(),
            roleId:Joi.string(),
            phone:Joi.string()
        }).options({ allowUnknown: false })
    },
    update:{
        params:Joi.object({
            id:Joi.string()
        }),
        body:Joi.object({
            name:Joi.string(),
            email: Joi.string().email(),
            phone:Joi.string(),
        }).options({ allowUnknown: false })
    },
    delete:{
        params:Joi.object({
            id:Joi.string().required()
        }).options({ allowUnknown: false })
    },
    search:{
        query:Joi.object({
            name:Joi.string(),
            page: Joi.number().integer().min(-1).required(),
            limit:Joi.number().integer(),
        }).options({ allowUnknown: false })
    },
    roleChagne:{
        body:Joi.object({
            roleId:Joi.string().required(),
            userId:Joi.string().required()
        }).options({ allowUnknown: false })
    }
}
