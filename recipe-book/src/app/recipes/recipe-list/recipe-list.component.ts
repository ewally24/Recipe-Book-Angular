import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from "../recipe"; 

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipe = new Recipe('Dummy', 'Dummy', 'http://vignette1.wikia.nocookie.net/logopedia/images/e/ed/Coca-Cola_logo_2.png/revision/latest?cb=20110821082437');

  @Output() recipeSelected = new EventEmitter<Recipe>();

  onSelected(recipe: Recipe) {
  	this.recipeSelected.emit(recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
