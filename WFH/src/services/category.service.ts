import { injectable,inject } from "inversify";
import { CategoryRepository } from "../dal";
import { ApiError } from "../utils/ApiError";
import { ICategory } from "../model";

@injectable()
export class CategoryService{
    constructor(
        @inject(CategoryRepository) private categoryDal:CategoryRepository,
    ){
        
    }
    
    /**
     * this function use for get all categories
     * @param name 
     * @returns 
     */
    async createCategory(name:string):Promise<ICategory>{
        return await this.categoryDal.createCategory(name);
    }

    /**
     * this function use for get all categories
     * @returns 
     */
    async getCategories(){
        return await this.categoryDal.getCategories();
    }

    /**
     * this function use for update a category
     * @param id 
     * @param name 
     * @returns 
     */
    async updateCategory(id:string,name:string){
        const isCategoryIdValid = await this.categoryDal.getCategoriesById(id);
        if(!isCategoryIdValid) throw new ApiError(400,"Category id is not valid");

        await this.categoryDal.updateCategory(id,name);
    }

    /**
     * this function use for delete a category
     * @param id 
     * @returns 
     */
    async deleteCategory(id:string){
        const isCategoryIdValid = await this.categoryDal.getCategoriesById(id);
        if(!isCategoryIdValid) throw new ApiError(400,"Category id is not valid");

        await this.categoryDal.deleteCategory(id);
    }


}