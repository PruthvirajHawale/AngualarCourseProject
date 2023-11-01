import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  subscription : Subscription

  constructor( private recipeService : RecipeService,
               private route : Router,
               private acitvatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeAddedEmitter.subscribe(
      (recipes : Recipe[]) =>{
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.route.navigate(['new'], {relativeTo:this.acitvatedRoute})
  }

  ngOnDestory(){
      this.subscription.unsubscribe();
  }
}
