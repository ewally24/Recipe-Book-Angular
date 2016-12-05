import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { Response } from '@angular/http';


@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  onStore() {
  	this.recipeService.storeData().subscribe(
  		(recipeData: any) => console.log(recipeData)
  	)
  }

  onGet() {
  	this.recipeService.getData();
  }

  ngOnInit() {
  }

}
