import Joi from "joi";

export const moduleSchema = {
    create:{
        body:Joi.object({
            name:Joi.string().required()
        }).options({ allowUnknown: false })
    },
    update:{
        params:Joi.object({
            id:Joi.string().required()
        }),
        body:Joi.object({
            name:Joi.string().required()
        }).options({ allowUnknown: false })
    },
    delete:{
        params:Joi.object({
            id:Joi.string().required()
        }).options({ allowUnknown: false })
    }
}
