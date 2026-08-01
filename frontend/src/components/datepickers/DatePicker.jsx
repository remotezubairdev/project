import { useState } from "react";

import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";

export function DatePicker({ selected, setSelected }) {
  const today = new Date()
  return (
    <DayPicker
      animate
      mode="single"
      disabled={{ before: today }}
      onSelect={setSelected}
      selected={selected}
      footer={selected ? `Picked date: ${selected.toLocaleDateString()}` : "Pick a date"}
    />
  );
}