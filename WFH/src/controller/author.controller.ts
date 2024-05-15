import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { AuthorService } from "../services";
import { ErrorHandler } from "../handler/error.handler";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { IAuthor } from "../model";
import { AuthMiddleware, IsAdminMiddleware } from "../middleware";

@controller('/author')
export class AuthorController {
    constructor(
        @inject(AuthorService) private authorService: AuthorService,
        @inject(ErrorHandler) private errorHandler: ErrorHandler
    ) {

    }

    @httpGet('/')
    async getAuthors(req: Request, res: Response, next: NextFunction) {
        const { page, limit } = req.query;
        try {
            if(!page || !limit) throw new ApiError(400, 'Page and limit query parameters are required')
            const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
            const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;
            const authors:IAuthor[] = await this.authorService.getAuthors(pageNumber, limitNumber);
            return res.jsonResponse(authors,"success",200);

        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }

    @httpPost('/',AuthMiddleware,IsAdminMiddleware)
    async createAuthor(req: Request, res: Response, next: NextFunction) {
        const { name, bio, nationlity } = req.body;
        try {
            if (!name || !bio || !nationlity) {
                throw new ApiError(400, 'All fields are required');
            }
            if(typeof name !== 'string' || typeof bio !== 'string' || typeof nationlity !== 'string') throw new ApiError(400, 'All fields must be string');
            
            const author:IAuthor = await this.authorService.createAuthor(name, bio, nationlity);
            return res.jsonResponse(author, "success", 201);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }

    @httpPut('/:id',AuthMiddleware,IsAdminMiddleware)
    async updateAuthor(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, bio, nationlity } = req.body;
        try {
            if(!id) throw new ApiError(400, 'Author id is required');
            if (!name || !bio || !nationlity) {
                throw new ApiError(400, 'All fields are required');
            }
            if(typeof name !== 'string' || typeof bio !== 'string' || typeof nationlity !== 'string') throw new ApiError(400, 'All fields must be string');

            await this.authorService.updateAuthor(id, name, bio, nationlity);
            return res.jsonResponse(null, "Author updated successfully", 200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }

    @httpDelete('/:id',AuthMiddleware,IsAdminMiddleware)
    async deleteAuthor(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            if(!id) throw new ApiError(400, 'Author id is required');
            await this.authorService.deleteAuthor(id);
            return res.jsonResponse(null, "Author deleted successfully", 200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }

    @httpGet('/search',AuthMiddleware,IsAdminMiddleware)
    async searchAuthor(req: Request, res: Response, next: NextFunction) {
        const { name } = req.query;
        try {
            if(!name) throw new ApiError(400, 'Name query parameter is required');
            const authors:IAuthor[] = await this.authorService.searchAuthor(name as string);
            return res.jsonResponse(authors, "success", 200);
        } catch (error) {
            this.errorHandler.handleError(error, req, res, null)
        }
    }
}
