import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{

    constructor(private shoppingListService : ShoppingListService){}

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
}