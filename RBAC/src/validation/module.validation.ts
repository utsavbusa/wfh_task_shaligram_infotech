import Joi from "joi";

export const moduleSchema = {
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
    },
    get:{
        query:{
            userId:Joi.string(),
            name:Joi.string(),
            page:Joi.number().integer().min(-1).required(),
            limit:Joi.number()
        }
    }
}
