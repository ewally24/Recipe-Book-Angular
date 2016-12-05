import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  subscription: Subscription;
  selectedRecipe: Recipe;
  recipeIndex: number;
  isNew = true;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService,
  	          private router: Router) { }

 onSubmit() {
 	const newRecipe = this.recipeForm.value;
 	if(this.isNew) {
 		this.recipeService.addRecipe(newRecipe);
 		this.navigateBack();
 	} else {
 		this.recipeService.editRecipe(this.selectedRecipe, newRecipe);
 		this.navigateBack();
 	}
 } 

 onAddItem(itemName: string, itemAmount: number) {
 	(<FormArray>this.recipeForm.controls['ingredients']).push(
 		new FormGroup({
 			"name": new FormControl(itemName, Validators.required),
 			"amount": new FormControl(itemAmount, [Validators.required,
 				Validators.pattern('\\d')
 			])
 		})
 	)
 }

 onDeleteItem(itemIndex: number) {
 	(<FormArray>this.recipeForm.controls['ingredients']).removeAt(itemIndex);
 }

 navigateBack() {
 	this.router.navigate(['../']);
 }

 ngOnInit() {
 	this.subscription = this.activatedRoute.params.subscribe(
 		(param: any) => {
 			if(param.hasOwnProperty('id')) {
 					this.isNew = false;
 					this.recipeIndex = +param['id'];
 					this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex)
 				} else {
 					this.isNew = true;
 					this.selectedRecipe = null;
 				}
 				this.initForm();
 			}
 		)
 	}

 private initForm() {
 	let recipeName = '';
 	let recipeImagePath = '';
 	let recipeDescription = '';
 	let recipeIngredients = new FormArray([]);

 	if(!this.isNew) {
 		if(this.selectedRecipe.hasOwnProperty('ingredient')) {
 			for(let i = 0; i < this.selectedRecipe.ingredients.length; i++) {
 			recipeIngredients.push(
 				new FormGroup({
 					"name": new FormControl(this.selectedRecipe.ingredients[i].name, Validators.required),
 					"amount": new FormControl(this.selectedRecipe.ingredients[i].amount, [Validators.required,
 						Validators.pattern('\\d+')
 					])
 				})
 			)
 		}	
 	}
 		
 			recipeName = this.selectedRecipe.name;
        	recipeImagePath = this.selectedRecipe.imagePath;
 			recipeDescription = this.selectedRecipe.description;
 		}

 		this.recipeForm = new FormGroup({
 			"name": new FormControl(recipeName, Validators.required),
 			"imagePath": new FormControl(recipeImagePath, Validators.required),
 			"description": new FormControl(recipeDescription, Validators.required),
 			"ingredients": recipeIngredients
 		})
 }

 ngOnDestroy() {
 	this.subscription.unsubscribe();
 }
}

  


