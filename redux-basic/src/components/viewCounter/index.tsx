import React from "react";
import { useSelector } from "react-redux";

import { ICounter, TCounterState } from "../../store/counter/types";

export default function SetCounter(): JSX.Element {
  const counter = useSelector<TCounterState, ICounter>(state => state.counter);

  return <div>{counter.contador}</div>;
}
