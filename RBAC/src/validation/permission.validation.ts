import Joi, { string } from "joi";

export const permissionSchema = {
    update:{
        body:{
            roleId:string,
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
        }
    }
}
