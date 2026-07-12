"use client";

import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";

import PriceModal from "./PriceModal";

const holidays: Record<string, string> = {
  "2026-01-01": "🎆 Capodanno",
  "2026-01-06": "👑 Epifania",
  "2026-04-06": "🕊 Pasquetta",
  "2026-04-25": "🇮🇹 Liberazione",
  "2026-05-01": "🔨 Lavoro",
  "2026-06-02": "🇮🇹 Repubblica",
  "2026-08-15": "🏖 Ferragosto",
  "2026-11-01": "🌼 Ognissanti",
  "2026-12-08": "✨ Immacolata",
  "2026-12-25": "🎄 Natale",
  "2026-12-26": "🎁 Santo Stefano",
};

export default function PriceCalendar() {
  const [open, setOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const [prices, setPrices] = useState<any[]>([]);

  // Li useremo nel prossimo step per la selezione multipla
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function loadPrices() {
    const response = await fetch("/api/prices");
    const json = await response.json();

    setPrices(json.data || []);
  }

  useEffect(() => {
    loadPrices();
  }, []);

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
        selectable={true}
selectMirror={true}
unselectAuto={false}
        select={(info) => {
  setStartDate(info.startStr);

  // FullCalendar restituisce la data finale esclusa.
  // La riportiamo al giorno precedente.
  const end = new Date(info.end);
  end.setDate(end.getDate() - 1);

  const endStr = end.toISOString().split("T")[0];

  setEndDate(endStr);
  setSelectedDate(info.startStr);

  setOpen(true);
}}
dateClick={(info) => {
  setStartDate(info.dateStr);
  setEndDate(info.dateStr);
  setSelectedDate(info.dateStr);
  setOpen(true);
}}
        dayCellContent={(info) => {
          const date = info.date.toLocaleDateString("en-CA");
const day = info.date.getDay();
const isWeekend = day === 0 || day === 6;
          const currentPrice = prices.find(
            (p) => p.date === date
          );
          const holiday = holidays[date]

          return (
            <div
  className={`h-full flex flex-col p-1 rounded-md ${
    isWeekend
      ? "bg-blue-50"
      : ""
  }`}
>
              <div className="font-semibold text-gray-700">
                {info.dayNumberText.replace(/\D/g, "")}
              </div>
{holiday && (
  <div className="text-[10px] font-semibold text-red-600 mt-1">
    {holiday}
  </div>
)}
              <div className="mt-2">
  {currentPrice ? (
    <div className="inline-block bg-green-100 text-green-800 font-bold text-xs rounded-md px-2 py-1">
      {currentPrice.price} €
    </div>
  ) : (
    <div className="text-gray-300 text-xs">
      —
    </div>
  )}
</div>
            </div>
          );
        }}
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

          await response.json();

          await loadPrices();

          setOpen(false);
        }}
      />
    </div>
  );
}