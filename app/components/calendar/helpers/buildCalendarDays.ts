export type CalendarSlot = {
  id: number;
  name: string;
  color: string;
  booking: any;
};

export type HalfDay = {
  morning: any | null;
  afternoon: any | null;
};

export type CalendarDays = Record<string, HalfDay>;

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function buildCalendarDays(bookings: any[]): CalendarDays {
  const days: CalendarDays = {};

  bookings.forEach((booking) => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);

    // CHECK-IN
    const checkInKey = formatDate(checkIn);

    if (!days[checkInKey]) {
      days[checkInKey] = {
        morning: null,
        afternoon: null,
      };
    }

    days[checkInKey].afternoon = booking;

    // GIORNI INTERMEDI
    const current = new Date(checkIn);
    current.setDate(current.getDate() + 1);

    while (current < checkOut) {
      const key = formatDate(current);

      if (!days[key]) {
        days[key] = {
          morning: null,
          afternoon: null,
        };
      }

      days[key].morning = booking;
      days[key].afternoon = booking;

      current.setDate(current.getDate() + 1);
    }

    // CHECK-OUT
    const checkOutKey = formatDate(checkOut);

    if (!days[checkOutKey]) {
      days[checkOutKey] = {
        morning: null,
        afternoon: null,
      };
    }

    days[checkOutKey].morning = booking;
  });

  return days;
}