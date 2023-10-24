import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients(){
        return this.ingredients.slice();
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice())
      }

      addIngredientsList(ingredentsParas:Ingredient[]){
        // ingredents.forEach(element => {
        //     this.ingredients.push(element);
        // });
        // this.ingredientChanged.emit(this.ingredients.slice())

        this.ingredients.push(...ingredentsParas)
        this.ingredientChanged.emit(this.ingredients.slice())
      }
}