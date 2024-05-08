import { injectable } from "inversify";
import { Author, IAuthor } from "../model";
import { ApiError } from "../utils/ApiError";

@injectable()
export class AuthorRepository {

    async getAuthorsById(id: string) {
        const author = await Author.findById(id);
        return author;
    }

    /**
     * this function use to get all authors
     * @param page 
     * @param limit 
     * @returns 
     */
    async getAuthors(page:number,limit:number):Promise<IAuthor[]> {
        const skip = (page - 1) * limit;
        const authors = await Author.find().skip(skip).limit(limit);
        return authors;
    }


    /**
     * this function use to create a author
     * @param name 
     * @param bio 
     * @param nationlity 
     * @returns 
     */
    async createAuthor(name: string, bio: string, nationality: string): Promise<IAuthor>{
        const author = await Author.create({ name, bio, nationality });
        return author;
    }

    /**
     * this function use to update a author
     * @param id 
     * @param name 
     * @param bio 
     * @param nationlity 
     * @returns 
     */
    async updateAuthor(id: string, name: string, bio: string, nationlity: string) {
        const resultAuthor = await Author.updateOne({ _id: id }, { name, bio, nationlity });
        if (resultAuthor.modifiedCount === 0) {
            throw new ApiError(400, "Author not updated");
        }

    }

    /**
     * this function use for delete a author
     * @param id 
     * @returns 
     */
    async deleteAuthor(id: string) {
        const resultAuthor = await Author.deleteOne({ _id: id });
        if (resultAuthor.deletedCount === 0) {
            throw new ApiError(400, "Author not deleted");
        }

    }

    /**
     * this function use to search author
     * @param name 
     * @param nationality 
     * @returns 
     */
    async searchAuthor(name: string): Promise<IAuthor[]>{
        const authors = await Author.find({ name: { $regex: name, $options: 'i' } });
        return authors;
    }
}