import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 id : number;

  constructor(private recipeService : RecipeService,
              private route: Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'],
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )

  }


  addToIngredients(){
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    // this.route.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute})
    this.route.navigate(['edit'],{relativeTo:this.activatedRoute})
  }
}


