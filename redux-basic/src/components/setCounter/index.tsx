import React from "react";
import { useDispatch } from "react-redux";

import * as counterActions from "../../store/counter/actions";
import { CounterActionTypes as TypeAction } from "../../store/counter/types";

export default function SetCounter(): JSX.Element {
  const dispatch = useDispatch();

  function handleCounter(action: TypeAction) {
    action === TypeAction.COUNTER_INCREMENT
      ? dispatch(counterActions.counterIncrement())
      : dispatch(counterActions.counterDecrement());
  }

  return (
    <div>
      <button onClick={() => handleCounter(TypeAction.COUNTER_INCREMENT)}>
        Incrementar
      </button>
      <button onClick={() => handleCounter(TypeAction.COUNTER_DECREMENT)}>
        Decrementar
      </button>
    </div>
  );
}
