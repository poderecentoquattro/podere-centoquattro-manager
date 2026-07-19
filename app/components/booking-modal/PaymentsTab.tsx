import type { BookingForm } from "./types";

type PaymentsTabProps = {
  form: BookingForm;
  setForm: React.Dispatch<React.SetStateAction<BookingForm>>;
};

export default function PaymentsTab({
  form,
  setForm,
}: PaymentsTabProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">
        Pagamenti
      </h2>

      <p className="text-gray-500">
        PaymentsTab in costruzione...
      </p>
    </div>
  );
}