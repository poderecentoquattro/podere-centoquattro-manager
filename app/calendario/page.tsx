"use client";

import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";

import BookingModal from "../components/BookingModal";

type CalendarEvent = {
  id?: string;
  title: string;
  start: string;
  end: string;
};

export default function Calendario() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  async function loadBookings() {
    const response = await fetch("/api/booking");
    const json = await response.json();

          const apartmentColors: Record<string, string> = {
        Blu: "#2563EB",
  Verde: "#22C55E",
  Bianco: "#6B7280",
};

const eventi = json.data.map((b: any) => ({
  id: b.id.toString(),

 title: `${b.guest}\n📍 ${b.source}`,
  textColor: "#ffffff",

  start: b.check_in,
  end: b.check_out,
  display: "block",

  backgroundColor:
    apartmentColors[b.apartments.name] ?? "#15803d",

  borderColor:
    apartmentColors[b.apartments.name] ?? "#15803d",

  extendedProps: {
    booking: b,
  },
}));

    setEvents(eventi);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        Podere Centoquattro Manager
        Calendario Prenotazioni

      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  locale={itLocale}
  height="auto"

  eventDisplay="block"
  displayEventEnd={false}
  nextDayThreshold="00:00:00"

  events={events}

         dateClick={(info) => {
  setSelectedBooking(null);
  setSelectedDate(info.dateStr);
  setOpen(true);
}}
          
          eventClick={(info) => {
  setSelectedBooking(info.event.extendedProps.booking);
  setOpen(true);
          }}
        />
      </div>

      <BookingModal
  open={open}
  onClose={() => {
    setOpen(false);
    setSelectedBooking(null);
    loadBookings();
  }}
  selectedDate={selectedDate}
  booking={selectedBooking}
  onSaved={loadBookings}
/>
    </div>
  );
}