import { CounterActionTypes } from "./types";

export function counterIncrement() {
  return {
    type: CounterActionTypes.COUNTER_INCREMENT,
    payload: {}
  };
}

export function counterDecrement() {
  return {
    type: CounterActionTypes.COUNTER_DECREMENT,
    payload: {}
  };
}
