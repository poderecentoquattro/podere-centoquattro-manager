"use client";

import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";
import BookingModal from "../BookingModal";
import CalendarEvent from "../CalendarEvent";

type CalendarEventType = {
  id?: string;
  title?: string;
  start: string;
  end: string;
};

export default function BookingCalendar() {
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
const [open, setOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState("");
const [selectedBooking, setSelectedBooking] = useState<any>(null);
 
useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
  }, []);

  async function loadBookings() {
    const response = await fetch("/api/booking");
    const json = await response.json();

    const apartmentColors: Record<string, string> = {
      Blu: "#2563EB",
      Verde: "#22C55E",
      Bianco: "#6B7280",
    };

   const eventi: any[] = [];

    json.data.forEach((b: any) => {
      eventi.push({
        id: `${b.id}-stay`,
        start: b.check_in,
        end: b.check_out,

        display: "block",

        backgroundColor:
          apartmentColors[b.apartments.name] ??
          "#15803d",

        borderColor:
          apartmentColors[b.apartments.name] ??
          "#15803d",

        extendedProps: {
          booking: b,
        },
      });
    });

    setEvents(eventi);
  }

  useEffect(() => {
    loadBookings();
  }, []);

   return (
    <>
      <div className="bg-white rounded-xl shadow p-2 md:p-6">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
          ]}
          dateClick={(info) => {
  setSelectedBooking(null);
  setSelectedDate(info.dateStr);
  setOpen(true);
}}

eventClick={(info) => {
  setSelectedBooking(info.event.extendedProps.booking);
  setOpen(true);
}}
          initialView="dayGridMonth"
          locale={itLocale}
          height="auto"
          aspectRatio={isMobile ? 0.9 : 1.7}
          handleWindowResize={true}
          fixedWeekCount={false}
          expandRows={true}
          dayMaxEventRows={isMobile ? 2 : 5}
          dayHeaderFormat={{
            weekday: isMobile ? "short" : "long",
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
           right: "dayGridMonth",
          }}
          eventDisplay="block"
          displayEventEnd={false}
          nextDayThreshold="00:00:00"
          events={events}
          eventContent={(arg) => (
            <CalendarEvent
              booking={arg.event.extendedProps.booking}
              color={String(arg.event.backgroundColor)}
              currentDate={arg.event.startStr}
              
            />
          )}
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
  </>
);
}