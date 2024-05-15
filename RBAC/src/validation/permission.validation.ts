import Joi from "joi";

export const permissionSchema = {
    create:{
        body:{
            perName:Joi.string().required(),
            roleId:Joi.string().required(),
            moduleId:Joi.string().required()
        }
    },
    update:{
        params:{
            id:Joi.string().required()
        },
        body:{
            perName:Joi.string().required(),
            roleId:Joi.string().required(),
            moduleId:Joi.string().required()
        }
    },
    delete:{
        params:{
            id:Joi.string().required()
        }
    }
}
