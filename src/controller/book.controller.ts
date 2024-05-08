import { inject } from 'inversify';
import { httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { controller } from 'inversify-express-utils';
import { BookService } from '../services';
import { ErrorHandler } from '../handler/error.handler';
import { NextFunction,Request,Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { AuthMiddleware, IsAdminMiddleware } from '../middleware';

@controller('/book')
export class BookController{
    constructor(@inject(BookService) private bookService: BookService,@inject(ErrorHandler) private errorHandler: ErrorHandler){
        
    }
    
    @httpGet('/')
    async getBooks(req: Request, res: Response, next: NextFunction) {
        const { page, limit } = req.query;
        try {
            if(!page || !limit) throw new ApiError(400, 'Page and limit query parameters are required')
            const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
            const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;
            const books = await this.bookService.getBooks(pageNumber, limitNumber);
            return res.jsonResponse(books,"success",200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res,null);
        }
    }

    @httpPost('/',AuthMiddleware.handler,IsAdminMiddleware.handler)
    async createBook(req:Request,res:Response,next:NextFunction){
        const { title, authorId, description, price, categoryId, isbn } = req.body;
        try {
            if (!title || !authorId || !description || !price || !categoryId || !isbn) {
                throw new ApiError(400, 'All fields are required');
            }
            if(typeof price !== 'number') throw new ApiError(400, 'Price must be a number');
            
            const book = await this.bookService.registerBook(title, authorId, description, price, categoryId, isbn);

            return res.jsonResponse(book,"success",201);
        } catch (error) {
            console.error('Error while creating book:', error);
            this.errorHandler.handleError(error, req, res,null);
        }
    }

    @httpPut('/:id',AuthMiddleware.handler,IsAdminMiddleware.handler)
    async updateBook(req:Request,res:Response,next:NextFunction){
        const { id } = req.params;
        const { title, authorId, description, price, categoryId, isbn } = req.body;
        try {
            if (!title || !authorId || !description || !price || !categoryId || !isbn) {
                throw new ApiError(400, 'All fields are required');
            }
            if(typeof price !== 'number') throw new ApiError(400, 'Price must be a number');
            
            await this.bookService.updateBook(id, title, authorId, description, price, categoryId, isbn);

            res.jsonResponse(null, "success", 200);
        } catch (error) {
            console.error('Error while updating book:', error);
            this.errorHandler.handleError(error, req, res,null);
        }
    }

    @httpDelete('/:id',AuthMiddleware.handler,IsAdminMiddleware.handler)
    async deleteBook(req:Request,res:Response,next:NextFunction){
        const { id } = req.params;
        try {
            await this.bookService.deleteBook(id);
            res.jsonResponse(null, "success", 200);
        } catch (error) {
            console.error('Error while deleting book:', error);
            this.errorHandler.handleError(error, req, res,null);
        }
    }

    @httpGet('/search')
    async searchBook(req:Request,res:Response,next:NextFunction){
        const { searchText, page, limit } = req.query;
        try {
            if(!searchText) throw new ApiError(400, 'Search text is required');
            if(!page || !limit) throw new ApiError(400, 'Page and limit query parameters are required')
            const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
            const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;
            const books = await this.bookService.searchBook(searchText as string,pageNumber, limitNumber);
            return res.jsonResponse(books,"success",200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res,null);
        }
    }
    
}