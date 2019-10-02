import { ICounter, CounterActionTypes, TCounterAction } from "./types";

const INITITAL_STATE: ICounter = {
  contador: 0
};

export function counter(
  state = INITITAL_STATE,
  action: TCounterAction
): ICounter {
  let { contador } = state;

  switch (action.type) {
    case CounterActionTypes.COUNTER_INCREMENT:
      contador++;

      return { contador };

    case CounterActionTypes.COUNTER_DECREMENT:
      contador--;
      return { contador };

    default:
      return state;
  }
}

export default counter;
