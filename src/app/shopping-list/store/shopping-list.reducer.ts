import  * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from './../../shared/ingredientmodel';

export interface State{
  ingredients : Ingredient[],
  editedIngredient:Ingredient,
  editedIngredientIndex: number
}

export interface AppState{
  shoppingList:State
}
const initialState :State= {
  ingredients: [
    new Ingredient('apple', 5),
    new Ingredient('tomato', 15)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};
export function shoppingListReducer(state:State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type){
      case ShoppingListActions.ADD_INGREDIENT:
        return {...state,ingredients:[...state.ingredients,action.payload]};

        case ShoppingListActions.ADD_INGREDIENTS:
        return {...state,ingredients:[...state.ingredients,...action.payload]};

        case ShoppingListActions.UPDATE_INGREDIENT:
          const ingredient = state.ingredients[state.editedIngredientIndex];
          const updatedIngredient ={
            ...ingredient,...action.payload
          };
          const updatedIngredients =[...state.ingredients];
          updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
          return {
             ...state,ingredients:updatedIngredients, editedIngredientIndex:null,
             editedIngredient:-1
          };

         case ShoppingListActions.DELETE_INGREDIENT:
           return {
             ...state,ingredients:state.ingredients.filter((ig,igIndex)=>{
               return igIndex!==state.editedIngredientIndex;
             }), editedIngredientIndex:null,
             editedIngredient:-1
           }
         case ShoppingListActions.START_EDIT:
           return {
             ...state,
             editedIngredientIndex:action.payload,
             editedIngredient:{...state.ingredients[action.payload]}
            };
         case ShoppingListActions.STOP_EDIT:
           return {
            ...state,
            editedIngredientIndex:null,
            editedIngredient:-1
           };
       default :
       return state;
    }
}
