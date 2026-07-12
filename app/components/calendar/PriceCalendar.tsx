"use client";

import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";

import PriceModal from "./PriceModal";

export default function PriceCalendar() {
  const [open, setOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState("");
  return (
    <div className="bg-white rounded-xl shadow p-2 md:p-6">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        locale={itLocale}
        height="auto"
        fixedWeekCount={false}
        expandRows={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        dateClick={(info) => {
  setSelectedDate(info.dateStr);
  setOpen(true);
}}
        dayCellContent={(info) => (
          <div className="h-full flex flex-col p-1">

            <div className="font-semibold text-gray-700">
              {info.dayNumberText.replace(/\D/g, "")}
            </div>

            <div className="mt-2 text-green-700 font-bold text-sm">
              💶 ---
            </div>

          </div>
        )}
      />

<PriceModal
  open={open}
  date={selectedDate}
  onClose={() => setOpen(false)}
      onSave={async (price) => {
  const response = await fetch("/api/prices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: selectedDate,
      price,
    }),
  });

  const result = await response.json();

  console.log(result);

  setOpen(false);
}}
/>
    </div>

  );
}