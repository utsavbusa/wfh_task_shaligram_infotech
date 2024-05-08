import { inject, injectable } from "inversify";
import { AuthorRepository, BookRepository, CategoryRepository } from "../dal";
import { IBook } from "../model";
import { ApiError } from "../utils/ApiError";

@injectable()
export class BookService {

    constructor(@inject(BookRepository) private bookDal: BookRepository,
    @inject(AuthorRepository) private authorDal: AuthorRepository,
    @inject(CategoryRepository) private categoryDal: CategoryRepository
) { }

    /**
     * this method will register a book
     * @param title 
     * @param authorId 
     * @param description 
     * @param price 
     * @param categoryId 
     * @param isbn 
     * @returns 
     */
    async registerBook(title: string, authorId: string, description: string, price: number, categoryId: string, isbn: string): Promise<IBook | null> {

        const isAutherIdValid = await this.authorDal.getAuthorsById(authorId);
        if (!isAutherIdValid) throw new ApiError(400, 'Author id is not valid');

        const isCategoryIdValid = await this.categoryDal.getCategoriesById(categoryId); 
        if (!isCategoryIdValid) throw new ApiError(400, 'Category id is not valid');

        const book: IBook = await this.bookDal.registerBook(title, authorId, description, price, categoryId, isbn);

        if (!book) throw new ApiError(500,"Internal server error")
        return book;
    }

    /**
     * this method will get all books with pagination
     * @param page 
     * @param limit 
     * @returns 
     */
    async getBooks(page: number, limit: number): Promise<IBook[]> {

        const books: IBook[] = await this.bookDal.getBooks(page, limit);
        return books;
    }

    /**
     * this method will update a book
     * @param id 
     * @param title 
     * @param authorId 
     * @param description 
     * @param price 
     * @param categoryId 
     * @param isbn 
     * @returns 
     */
    async updateBook(id: string, title: string, authorId: string, description: string, price: number, categoryId: string, isbn: string): Promise<void> {

        const isValidId = await this.bookDal.getBookById(id);
        if(!isValidId) throw new ApiError(400, 'Book id is not valid');

        const isAutherIdValid = await this.authorDal.getAuthorsById(authorId);
        if (!isAutherIdValid) throw new ApiError(400, 'Author id is not valid');

        const isCategoryIdValid = await this.categoryDal.getCategoriesById(categoryId); 
        if (!isCategoryIdValid) throw new ApiError(400, 'Category id is not valid');

        await this.bookDal.updateBook(id, title, authorId, description, price, categoryId, isbn);
        return;
    }

    /**
     * this method will delete a book
     * @param id 
     * @returns 
     */
    async deleteBook(id: string): Promise<void> {
        
        const isValidId = await this.bookDal.getBookById(id);
        if(!isValidId) throw new ApiError(400, 'Book id is not valid');

        await this.bookDal.deleteBook(id);
        return;
    }

    /**
     * this funciton will search a book
     * @param searchText 
     * @param page 
     * @param limit 
     * @returns 
     */
    async searchBook(searchText:string,page:number,limit:number): Promise<IBook[]> {
        const books: IBook[] = await this.bookDal.searchBook(searchText,page,limit);
        return books;
    }
}