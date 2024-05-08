import { injectable } from "inversify";
import { Book, IBook } from "../model";
import { ApiError } from "../utils/ApiError";

@injectable()
export class BookRepository {

    /**
     * this book use to register a book
     * @param title 
     * @param author 
     * @param description 
     * @param price 
     * @param category 
     * @param isbn 
     * @returns 
     */
    async registerBook(title: string, authorId: string, description: string, price: number, categoryId: string, isbn: string): Promise<IBook> {
        const book: IBook = await Book.create({
            title,
            authorId,
            description,
            price,
            categoryId,
            isbn
        })
        return book;
    }

    /**
     * this function use to get all books with pagination
     * @param page 
     * @param limit 
     * @returns 
     */
    async getBooks(page: number, limit: number): Promise<IBook[]> {

        const skip = (page - 1) * limit;
        const books: IBook[] = await Book.aggregate([
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $addFields: {
                    authorName: { $arrayElemAt: ['$author.name', 0] },
                    categoryName: { $arrayElemAt: ['$category.name', 0] }
                }
            },
            {
                $project: {
                    author: 0, // Exclude the author field from the final output
                    category: 0 // Exclude the category field from the final output
                }
            }
        ]);
        return books;
    }

    /**
     * this function use to get a book by id
     * @param id 
     * @param title 
     * @param author 
     * @param description 
     * @param price 
     * @param category 
     * @param isbn 
     * @returns 
     */
    async updateBook(id: string, title: string, authorId: string, description: string, price: number, categoryId: string, isbn: string): Promise<void> {
        const resultBook = await Book.updateOne({ _id: id }, {
            title,
            authorId,
            description,
            price,
            categoryId,
            isbn
        });
        if (resultBook.modifiedCount === 0) throw new ApiError(500, "Internal server error")

    }

    /**
     * this is function use to delete a book by id
     * @param id 
     * @returns 
     */
    async deleteBook(id: string): Promise<void> {
        await Book.deleteOne({ _id: id });
    }

    /**
     * this function use to get a book by id
     * @param id 
     * @returns 
     */
    async getBookById(id: string): Promise<IBook | null> {
        const book: IBook | null = await Book.findById(id);
        return book;
    }


    /**
     * this function use to search book
     * @param searchText 
     * @param page 
     * @param limit 
     * @returns 
     */
    async searchBook(page:number,limit:number,searchText?:string): Promise<IBook[]> {
        const pipeline: any[] = [
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categories'
                }
            },
            {
                $unwind: "$author"
            },
            {
                $unwind: "$categories"
            },
            {
                $addFields: {
                    authorName: "$author.name",
                    categoryName: "$categories.name"
                }
            },
            {
                $project: { author: 0, categories: 0, createdAt: 0, updatedAt: 0 }
            },
            ...(searchText?.trim()!=="" ? [
                {
                    $match: {
                        $or: [
                            { title: { $regex: searchText, $options: 'i' } },
                            { isbn: { $regex: searchText, $options: 'i' } },
                            { description: { $regex: searchText, $options: 'i' } },
                            { 'authorName': { $regex: searchText, $options: 'i' } },
                            { 'categoryName': { $regex: searchText, $options: 'i' } }
                        ]
                    }
                }
            ] : [])
        ];

        const books: IBook[] = await Book.aggregate(pipeline);
        return books;
    }


}