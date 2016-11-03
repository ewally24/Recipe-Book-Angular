import { Injectable } from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {

  recipes: Recipe[] = [
  new Recipe('Coke-Cola', 'Syrupy Doo-Doo Butter that tastes pretty good', 'http://vignette1.wikia.nocookie.net/logopedia/images/e/ed/Coca-Cola_logo_2.png/revision/latest?cb=20110821082437', [
  	new Ingredient('Water', 2),
  	new Ingredient('Syrupy Stuff', 3),
  	new Ingredient('Fizz', 4)
  	]),
  new Recipe('Schnitzel', 'Okayish', 'http://www.kochecke.com/files/imagecache/400x400/upload/wienerschnitzel.jpg', [])];

  getRecipes() {
  	return this.recipes;
  }

  constructor() { }

}
