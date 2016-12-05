import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  
  private items: Ingredient[] = [];
  selectedItem: Ingredient;

  onSelectedItem(item: Ingredient) {
  	this.selectedItem = this.sls.selectItem(item);
  }

  onCleared() {
  	this.selectedItem = null;
  }

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
  	this.items = this.sls.getItems();
  	console.log(this.items);
  }

}
