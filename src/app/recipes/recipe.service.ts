import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{

    constructor(private shoppingListService : ShoppingListService){}

       recipeAddedEmitter = new Subject<Recipe[]>();

     private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
            new Ingredient('meat',1),
            new Ingredient('chocalte',2)
        ]),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
            new Ingredient('meat2',1),
            new Ingredient('chocalte3',2)
        ])
      ];

      getRecipe(id : number){
        return this.recipes[id];
      }
      getRecipes(){
        return this.recipes.slice(); //To not share the reference of object
      }

      addToShoppingList(ingredents : Ingredient[]){
        this.shoppingListService.addIngredientsList(ingredents);
      }

      addRecipes(recipe : Recipe){
        this.recipes.push(recipe)
        this.recipeAddedEmitter.next(this.recipes.slice())
      }

      updateRecipe(index: number, recipe : Recipe){
        this.recipes[index] = recipe;
        this.recipeAddedEmitter.next(this.recipes.slice())
      }

      deleteRecipe(index :number){
        this.recipes.splice(index,1);
        this.recipeAddedEmitter.next(this.recipes.slice())
      }
}