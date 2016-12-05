import { Component, OnInit} from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

 @Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

 // recipe = new Recipe("Coke-Cola", "Fizzy Pop", "http://vignette1.wikia.nocookie.net/logopedia/images/e/ed/Coca-Cola_logo_2.png/revision/latest?cb=20110821082437", []);

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    )
  }

}
