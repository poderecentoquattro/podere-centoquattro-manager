import type {
  BookingForm,
  GuestForm,
  Apartment,
} from "../booking-modal/types";

import ProformaHeader from "./ProformaHeader";
import ProformaGuest from "./ProformaGuest";
import ProformaStay from "./ProformaStay";
import ProformaPayments from "./ProformaPayments";

type Props = {
  booking: BookingForm;
  guest: GuestForm;
  apartment: Apartment | null;
};

export default function ProformaPreview({
  booking,
  guest,
  apartment,
}: Props) {
  return (
    <div className="a4-page p-[18mm] shadow-2xl rounded-sm">

      <ProformaHeader />

      <ProformaGuest guest={guest} />

      <ProformaStay
        booking={booking}
        apartment={apartment}
      />
      <ProformaPayments
        booking={booking}
      />
    </div>
  );
}