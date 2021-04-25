import  * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from './../../shared/ingredientmodel';

const initialState = {
  ingredients: [
    new Ingredient('apple', 5),
    new Ingredient('tomato', 15)
  ]
};
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type){
      case ShoppingListActions.ADD_INGREDIENT:
        return {...state,ingredients:[...state.ingredients,action.payload]};

        case ShoppingListActions.ADD_INGREDIENTS:
        return {...state,ingredients:[...state.ingredients,...action.payload]};

       default :
       return state;
    }
}
