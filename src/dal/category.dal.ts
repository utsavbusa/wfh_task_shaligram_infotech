import { injectable } from "inversify";
import { Category, ICategory } from "../model";
import { ApiError } from "../utils/ApiError";

@injectable()

export class CategoryRepository {
    
    /**
     * this method is used to get all categories
     * @param id 
     * @returns 
     */
    async getCategoriesById(id: string):Promise<ICategory | null>{
        const category:ICategory | null = await Category.findById(id);
        return category;
    }

    /**
     * this function use to get all categories
     * @returns 
     */
    async getCategories():Promise<ICategory[]>{
        const categories:ICategory[] = await Category.find();
        return categories;
    }

    /**
     * this function use to create a category
     * @param name 
     * @returns 
     */
    async createCategory(name:string):Promise<ICategory>{
        const category:ICategory = await Category.create({name});
        return category;
    }

    /**
     * this function use to update a category
     * @param id 
     * @param name 
     * @returns 
     */
    async updateCategory(id:string,name:string):Promise<void>{
        const resultCategory = await Category.updateOne({_id:id},{name});
        if(resultCategory.modifiedCount === 0){
            throw new ApiError(400,"Category not updated");
        }
    }


    /**
     * this function use for delete a category
     * @param id 
     * @returns 
     */
    async deleteCategory(id:string):Promise<void>{
        const resultCategory = await Category.deleteOne({_id:id});
        if(resultCategory.deletedCount === 0){
            throw new ApiError(400,"Category not deleted");
        }
    }
}