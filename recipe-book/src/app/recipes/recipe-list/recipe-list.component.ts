import { Component, OnInit, EventEmitter, Output} from '@angular/core';

import { Recipe } from "../recipe";

 @Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
  new Recipe('Coke-Cola', 'Syrupy Doo-Doo Butter that tastes pretty good', 'http://vignette1.wikia.nocookie.net/logopedia/images/e/ed/Coca-Cola_logo_2.png/revision/latest?cb=20110821082437', []),
  new Recipe('Schnitzel', 'Okayish', 'http://www.kochecke.com/files/imagecache/400x400/upload/wienerschnitzel.jpg', [])];


  @Output() selectedRecipe = new EventEmitter<Recipe>();

  onSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
