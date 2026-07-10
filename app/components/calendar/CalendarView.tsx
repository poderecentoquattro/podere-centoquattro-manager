"use client";

import { useState } from "react";

import CalendarToolbar from "./CalendarToolbar";
import BookingCalendar from "./BookingCalendar";
import PriceCalendar from "./PriceCalendar";

export default function CalendarView() {
  const [viewMode, setViewMode] = useState<
    "bookings" | "prices"
  >("bookings");

  return (
    <>
      <CalendarToolbar
        viewMode={viewMode}
        onChange={setViewMode}
      />

      {viewMode === "bookings" ? (
        <BookingCalendar />
      ) : (
        <PriceCalendar />
      )}
    </>
  );
}