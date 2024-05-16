import Joi from "joi";

export const roleSchema = {
    create:{
        body:{
            name:Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required(),
            roleId:Joi.string().required(),
            phone:Joi.string(),
            statusId:Joi.string()
        }
    },
    update:{
        params:{
            id:Joi.string().required()
        },
        body:{
            name:Joi.string(),
            email:Joi.string(),
            roleId:Joi.string(),
            phone:Joi.string(),
            statusId:Joi.string()
        }
    },
    delete:{
        params:{
            id:Joi.string().required()
        }
    }
}
