import Joi from "joi";

export const roleSchema = {
    create:{
        body:{
            name:Joi.string().required()
        }
    },
    update:{
        params:{
            id:Joi.string().required()
        },
        body:{
            name:Joi.string().required()
        }
    },
    delete:{
        params:{
            id:Joi.string().required()
        }
    }
}
