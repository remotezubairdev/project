import { useState } from "react";

import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";

export function CalendarCard() {
    const date = new Date()

  return (
    <DayPicker
      animate
      mode="single"
      disabled={(date) => date != date.toDateString()}
      selected={date.toLocaleDateString()}
      footer={`Today is ${date.toDateString()}`}
    />
  );
}