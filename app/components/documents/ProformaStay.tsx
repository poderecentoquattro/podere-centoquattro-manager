import type {
  BookingForm,
  Apartment,
} from "../booking-modal/types";

type Props = {
  booking: BookingForm;
  apartment: Apartment | null;
};

export default function ProformaStay({
  booking,
  apartment,
}: Props) {
  return (
    <section className="mt-8">

      <h3 className="section-title">
        Soggiorno
      </h3>

      <div className="section-box">

        <div className="grid grid-cols-[180px_1fr]">

          <div className="border-b bg-gray-50 px-5 py-3 font-medium">
            Appartamento
          </div>

          <div className="border-b px-5 py-3">
            {apartment?.name ?? "-"}
          </div>

          <div className="border-b bg-gray-50 px-5 py-3 font-medium">
            Check-in
          </div>

          <div className="border-b px-5 py-3">
            {booking.check_in}
          </div>

          <div className="border-b bg-gray-50 px-5 py-3 font-medium">
            Check-out
          </div>

          <div className="border-b px-5 py-3">
            {booking.check_out}
          </div>

          <div className="border-b bg-gray-50 px-5 py-3 font-medium">
            Ospiti
          </div>

          <div className="border-b px-5 py-3">
            {booking.adults} adulti

            {booking.children > 0 &&
              ` • ${booking.children} bambini`}

            {booking.infants > 0 &&
              ` • ${booking.infants} neonati`}

            {booking.animals > 0 &&
              ` • ${booking.animals} animali`}
          </div>

          <div className="bg-gray-50 px-5 py-3 font-medium">
            Provenienza
          </div>

          <div className="px-5 py-3">
            {booking.source}
          </div>

        </div>

      </div>

    </section>
  );
}