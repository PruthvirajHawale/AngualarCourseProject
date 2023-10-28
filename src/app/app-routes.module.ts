import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const approutes : Routes = [
    { path: '' , redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'shoppinglist', component : ShoppingListComponent},
    { path: 'recipes', component : RecipesComponent, children :[ 
        { path : '', component: RecipeStartComponent},
        { path : 'new', component: RecipeEditComponent},
        { path : ':id', component: RecipeDetailComponent},
        { path : ':id/edit', component: RecipeEditComponent}

    ]}
];

@NgModule({
    imports : [RouterModule.forRoot(approutes,  { useHash : false})],
    exports : [RouterModule]
})
export class AppRoutesModule{

}