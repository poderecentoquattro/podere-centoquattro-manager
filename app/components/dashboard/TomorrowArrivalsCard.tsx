"use client";

import Card from "../Card";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Booking = any;

type Props = {
  bookings: Booking[];
};

export default function TomorrowArrivalsCard({
  bookings,
}: Props) {

  const router = useRouter();

  function openWhatsapp(
    e: React.MouseEvent,
    telefono?: string
  ) {
    e.stopPropagation();

    if (!telefono) return;

    const numero = telefono.replace(/\D/g, "");

    window.open(
      `https://wa.me/${numero}`,
      "_blank"
    );
  }

  return (
  <Card title="🛎 Arrivi Domani">
    {bookings.length === 0 ? (
      <p className="text-sm text-gray-500">
        Nessun arrivo previsto domani.
      </p>
    ) : (
      <div className="space-y-3">
        {bookings.map((booking) => (
  <div
    key={booking.id}
    onClick={() => router.push(`/calendario?id=${booking.id}`)}
    className="
      flex
      items-center
      justify-between
      rounded-xl
      border
      p-3
      cursor-pointer
      transition
      hover:bg-green-50
    "
  >
            <span className="font-semibold text-gray-800">
              👤 {booking.guest}
            </span>

            <button
              disabled={!booking.telefono}
              onClick={(e) =>
                openWhatsapp(e, booking.telefono)
              }
              title={
                booking.telefono
                  ? "Apri WhatsApp"
                  : "Numero non disponibile"
              }
              className={
                booking.telefono
                  ? "text-[#25D366] hover:scale-110 transition"
                  : "text-gray-300 cursor-not-allowed"
              }
            >
              <FaWhatsapp size={24} />
            </button>
          </div>
        ))}
      </div>
    )}
  </Card>
);
}