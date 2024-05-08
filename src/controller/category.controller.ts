import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { CategoryService } from "../services/category.service";
import { ErrorHandler } from "../handler/error.handler";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ICategory } from "../model";
import { AuthMiddleware, IsAdminMiddleware } from "../middleware";

@controller("/category")
export class CategoryController{
    constructor(
        @inject(CategoryService) private categoryService:CategoryService,
        @inject(ErrorHandler) private errorHandler:ErrorHandler
    ){}

    @httpGet('/')
    async getCategories(req:Request,res:Response,next:NextFunction){
        try {
            const categories:ICategory[] = await this.categoryService.getCategories();
            return res.jsonResponse(categories,"success",200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }

    @httpPost('/',AuthMiddleware.handler,IsAdminMiddleware.handler)
    async createCategory(req:Request,res:Response,next:NextFunction){
        const { name } = req.body;
        try {
            if (!name) {
                throw new ApiError(400, 'All fields are required');
            }
            if(typeof name !== 'string') throw new ApiError(400, 'All fields must be string');

            const category:ICategory = await this.categoryService.createCategory(name);
            return res.jsonResponse(category, "success", 201);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }

    @httpPut('/:id',AuthMiddleware.handler,IsAdminMiddleware.handler)
    async updateCategory(req:Request,res:Response,next:NextFunction){
        const { id } = req.params;
        const { name } = req.body;
        try {
            if(!id) throw new ApiError(400, 'Category id is required');
            if (!name) {
                throw new ApiError(400, 'All fields are required');
            }
            if(typeof name !== 'string') throw new ApiError(400, 'All fields must be string');
            await this.categoryService.updateCategory(id,name);
            return res.jsonResponse(null, "success", 200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }

    @httpDelete('/:id',AuthMiddleware.handler,IsAdminMiddleware.handler)
    async deleteCategory(req:Request,res:Response,next:NextFunction){
        const { id } = req.params;
        try {
            if(!id) throw new ApiError(400, 'Category id is required');
            await this.categoryService.deleteCategory(id);
            return res.jsonResponse(null, "success", 200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }
}