import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe("Coke-Cola", "Fizzy Pop", "http://vignette1.wikia.nocookie.net/logopedia/images/e/ed/Coca-Cola_logo_2.png/revision/latest?cb=20110821082437", 
      [
        new Ingredient('Nuka-Cola', 5),
        new Ingredient('Fizz', 7)
      ]),
    new Recipe('Schnitzel', 'Okayish', 'http://www.kochecke.com/files/imagecache/400x400/upload/wienerschnitzel.jpg', [])
  ]

  recipeChanged = new EventEmitter<Recipe[]>();

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('https://recipebook-e0a1c.firebaseio.com/recipes.json', body, {
      headers: headers
    })
    .catch(this.errorHandler)
  }

  getData() {
    return this.http.get('https://recipebook-e0a1c.firebaseio.com/recipes.json')
        .map((data: Response) => data.json())
        .catch(this.errorHandler)
        .subscribe(
          (data: Recipe[]) => {
            this.recipes = data;
            this.recipeChanged.emit(this.recipes);
          }
      )
  }

  private errorHandler(error: any) {
    console.log(error);
    return Observable.throw(error)
  }

  constructor(private http: Http) {
  }
}