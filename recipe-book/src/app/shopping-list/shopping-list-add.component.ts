import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnInit, OnChanges {
  isAdd: boolean = true;
  @Input() item: Ingredient =  null;
  @Output() cleared = new EventEmitter();

  onSubmit(ingredient: Ingredient) {
  	if(!this.isAdd) {
  		this.sls.editItem(this.item, new Ingredient(ingredient.name, ingredient.amount))
  		this.onCleared();
  	} else {
  		this.item = new Ingredient(ingredient.name, ingredient.amount);
  		this.sls.addItem(this.item);
  		this.onCleared();
  	} 
  }

  ngOnChanges(changes) {
  	if(changes.item.currentValue == null) {
  		this.isAdd = true;
  		this.item = {name: null, amount: null};
  	} else {
  		this.isAdd = false;

  	}
  }

  onDelete() {
  	this.sls.deleteItem(this.item);
  }

  onCleared() {
  	this.isAdd = true;
  	this.cleared.emit(null);
  }

 
  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
  }

}
