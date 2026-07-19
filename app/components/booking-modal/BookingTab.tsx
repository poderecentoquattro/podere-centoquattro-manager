import type { BookingForm, Apartment } from "./types";

type BookingTabProps = {
  form: BookingForm;
  setForm: React.Dispatch<React.SetStateAction<BookingForm>>;
  apartments: Apartment[];
};

export default function BookingTab({
  form,
  setForm,
  apartments,
}: BookingTabProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">
        Prenotazione
      </h2>

      <p className="text-gray-500">
        BookingTab in costruzione...
      </p>
    </div>
  );
}