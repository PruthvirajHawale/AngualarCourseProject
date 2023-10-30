import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients(){
        return this.ingredients.slice();
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
      }

      addIngredientsList(ingredentsParas:Ingredient[]){
        // ingredents.forEach(element => {
        //     this.ingredients.push(element);
        // });
        // this.ingredientChanged.emit(this.ingredients.slice())

        this.ingredients.push(...ingredentsParas)
        this.ingredientChanged.next(this.ingredients.slice())
      }

      getIngredient(index : number){
        return this.ingredients[index];
      }

      updateIngredient(index:number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index : number){
        this.ingredients.slice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
      }
}