import Card from "../Card";

type Booking = {
  id: string;
  guest: string;
  check_in: string;
  check_out: string;
  apartments?: {
    name: string;
  };
};

type Props = {
  arriviOggi: Booking[];
  partenzeOggi: Booking[];
};

export default function TodayCard({
  arriviOggi,
  partenzeOggi,
}: Props) {
  const nessunaAttivita =
    arriviOggi.length === 0 &&
    partenzeOggi.length === 0;

  return (
    <Card title="🌿 Oggi al Podere">
      {nessunaAttivita ? (
        <div className="rounded-2xl bg-green-50 p-8 text-center">

          <div className="text-5xl">
            ✅
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#0A5A34]">
            Nessuna attività in sospeso
          </h3>

          <p className="mt-2 text-gray-500">
            Buona giornata! 🌿
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {arriviOggi.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-green-100 bg-green-50 p-5"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="font-semibold text-[#0A5A34]">
                    🛎 Check-in
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {booking.guest}
                  </h3>

                  <p className="text-gray-500">
                    🏡 {booking.apartments?.name}
                  </p>

                </div>

              </div>
            </div>
          ))}

          {partenzeOggi.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-orange-100 bg-orange-50 p-5"
            >
              <p className="font-semibold text-orange-700">
                🚪 Check-out
              </p>

              <h3 className="mt-2 text-lg font-bold">
                {booking.guest}
              </h3>

              <p className="text-gray-500">
                🏡 {booking.apartments?.name}
              </p>

            </div>
          ))}

        </div>
      )}
    </Card>
  );
}