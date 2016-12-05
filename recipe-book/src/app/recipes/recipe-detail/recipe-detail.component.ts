import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";

import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeIndex: number;
  subscription: Subscription;
  selectedRecipe: Recipe;

  addToShoppingList() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

  constructor(private sls: ShoppingListService,
              private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
        (param: any) => 
          {
            this.recipeIndex = param["id"];
            this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
          }
      )
  }

  onEdit() {
    this.router.navigate(['/recipe', this.recipeIndex, 'edit']);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipe']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
