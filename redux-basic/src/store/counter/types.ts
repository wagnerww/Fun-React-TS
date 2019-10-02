/* Type de actions */
export enum CounterActionTypes {
  COUNTER_INCREMENT = "counter/increment",
  COUNTER_DECREMENT = "counter/decrement"
}

/* pre-load REDUX */
export type TCounterAction = {
  type: CounterActionTypes;
  payload: null | ICounter;
};

/* data interface */
export interface ICounter {
  contador: number;
}

/* State Counter */
export type TCounterState = { counter: ICounter };
