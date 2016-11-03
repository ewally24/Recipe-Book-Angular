import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient';

@Injectable()
export class ShoppingListService {
  
  private items: Ingredient[] = [];

  getItems() {
  	return this.items;
  }

  addItems(items: Ingredient[]) {
  	Array.prototype.push.apply(this.items, items);
  }

  constructor() { }

}
