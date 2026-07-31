"use client";

import { useEffect, useState } from "react";
import CalendarCell from "./CalendarCell";
import {
  buildCalendarDays,
  CalendarDays,
} from "@/app/components/calendar/helpers/buildCalendarDays";

const weekDays = [
  "Lun",
  "Mar",
  "Mer",
  "Gio",
  "Ven",
  "Sab",
  "Dom",
];

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let start = firstDay.getDay();
  start = start === 0 ? 6 : start - 1;

  const days: Date[] = [];

  for (let i = start; i > 0; i--) {
    days.push(new Date(year, month, 1 - i));
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  while (days.length < 42) {
    const last = days[days.length - 1];

    days.push(
      new Date(
        last.getFullYear(),
        last.getMonth(),
        last.getDate() + 1
      )
    );
  }

  return days;
}

export default function CustomCalendar() {
  const [calendarDays, setCalendarDays] =
    useState<CalendarDays>({});

  const days = getMonthDays(new Date());

  useEffect(() => {
    async function loadBookings() {
      const response = await fetch("/api/booking");
      const json = await response.json();

      if (!json.data) return;

      setCalendarDays(buildCalendarDays(json.data));
    }

    loadBookings();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="grid grid-cols-7 bg-gray-100 border-b">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center font-semibold border-r last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const key = formatDate(day);

          return (
            <CalendarCell
              key={key}
              day={day}
              morning={calendarDays[key]?.morning}
              afternoon={calendarDays[key]?.afternoon}
            />
          );
        })}
      </div>

    </div>
  );
}