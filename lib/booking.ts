import ical from "node-ical";
export async function getBookingEvents() {
  const url = process.env.BOOKING_ICAL!;

  const data = await ical.async.fromURL(url);

  const events: any[] = [];

  for (const key in data) {
    const event: any = data[key];

    if (event.type === "VEVENT") {
      events.push({
        title: "🏡 Prenotazione Booking",
        start: event.start,
        end: event.end,
      });
    }
  }

  return events;
}