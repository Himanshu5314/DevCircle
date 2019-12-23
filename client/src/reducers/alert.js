//alertReducer is a function that takes in a state and an action(dispatched from an actions file)
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  //action contains type and payload(or data which may be empty in some cases)
  const { type, payload } = action; //payload contains id and message in this example

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; //action.payload added to state after copying any previous alerts to state using spread operator(...)
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); //returns all alerts except the one with the respective payload
    default:
      return state;
  }
}
