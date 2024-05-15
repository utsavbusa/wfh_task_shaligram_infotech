import { inject, injectable } from "inversify";
import { AuthorRepository } from "../dal";
import { ApiError } from "../utils/ApiError";
import { IAuthor } from "../model";

@injectable()
export class AuthorService {

    constructor(@inject(AuthorRepository) private authDal:AuthorRepository){}

    /**
     * this function use for get authors
     * @param page 
     * @param limit 
     * @returns 
     */
    async getAuthors(page: number, limit: number):Promise<IAuthor[]> {
        const authors = await this.authDal.getAuthors(page, limit);
        return authors;
    }

    /**
     * this function use for create a author
     * @param name 
     * @param bio 
     * @param nationlity 
     * @returns 
     */
    async createAuthor(name: string, bio: string, nationlity: string):Promise<IAuthor> {
        const author = await this.authDal.createAuthor(name, bio, nationlity);
        return author;
    }

    /**
     * this function user for update a author
     * @param id 
     * @param name 
     * @param bio 
     * @param nationlity 
     * @returns 
     */
    async updateAuthor(id: string, name: string, bio: string, nationlity: string) {

        const isValidAuthorId = await this.authDal.getAuthorsById(id);
        if (!isValidAuthorId) {
            throw new ApiError(400, 'Author id is not valid');
        }
    
        await this.authDal.updateAuthor(id, name, bio, nationlity);
    }

    /**
     * this function use for delete a author
     * @param id 
     * @returns 
     */
    async deleteAuthor(id: string) {
        const isValidAuthorId = await this.authDal.getAuthorsById(id);
        if (!isValidAuthorId) {
            throw new ApiError(400, 'Author id is not valid');
        }
        await this.authDal.deleteAuthor(id);
    }

    /**
     * this function use for search author
     * @param name 
     * @returns 
     */
    async searchAuthor(name: string):Promise<IAuthor[]> {
        const authors = await this.authDal.searchAuthor(name);
        return authors;
    }
}