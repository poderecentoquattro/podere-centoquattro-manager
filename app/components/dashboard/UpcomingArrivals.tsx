import Card from "../Card";

type Booking = {
  id: string;
  guest: string;
  check_in: string;
  apartments?: {
    name: string;
  };
};

type Props = {
  bookings: Booking[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function UpcomingArrivals({ bookings }: Props) {
  return (
    <Card title="📅 Prossimi Arrivi">
      {bookings.length === 0 ? (
        <div className="rounded-2xl bg-green-50 p-8 text-center">

          <div className="text-4xl">
            🌿
          </div>

          <h3 className="mt-4 text-xl font-bold text-[#0A5A34]">
            Nessun arrivo programmato
          </h3>

        </div>
      ) : (
        <div className="space-y-4">

          {bookings.map((booking) => {

            const giorni = Math.ceil(
              (new Date(booking.check_in).getTime() -
                new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            );

            let badge = "";

            if (giorni <= 0) badge = "🟢 Oggi";
            else if (giorni === 1) badge = "🟡 Domani";
            else badge = `🔵 Tra ${giorni} giorni`;

            return (
              <div
                key={booking.id}
                className="
                  rounded-2xl
                  border
                  border-gray-100
                  p-5
                  transition-all
                  duration-300
                  hover:border-[#0A5A34]
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-lg font-bold text-[#0A5A34]">
                      👤 {booking.guest}
                    </h3>

                    <p className="mt-2 text-gray-500">
                      🏡 {booking.apartments?.name}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      📅 {formatDate(booking.check_in)}
                    </p>

                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#0A5A34]">
                    {badge}
                  </span>

                </div>
              </div>
            );
          })}

        </div>
      )}
    </Card>
  );
}