import Joi from "joi";

export const permissionSchema = {
    update:{
        body:Joi.object({
            roleId:Joi.string().required(),
            data:Joi.array().items(
                Joi.object({
                    moduleId: Joi.string().required(),
                    permission: Joi.object({
                        read: Joi.boolean(),
                        write: Joi.boolean(),
                        update:Joi.boolean(),
                        delete:Joi.boolean()
                    }).required()
                }).options({ allowUnknown: false })
            )
        })
    },
    get:{
        query:Joi.object({
            roleId:Joi.string(),
            name:Joi.string(),
            page:Joi.number().integer().min(-1).required(),
            limit:Joi.number()
        }).options({ allowUnknown: false })
    }
}
