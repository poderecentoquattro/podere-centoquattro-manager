"use client";

import CalendarView from "../components/CalendarView";

export default function Calendario() {
  return (
    <div className="p-2 md:p-6">
      <h1 className="text-xl md:text-4xl font-bold text-green-800 mb-6">
        Podere Centoquattro Manager
      </h1>

      <CalendarView />
    </div>
  );
}}         