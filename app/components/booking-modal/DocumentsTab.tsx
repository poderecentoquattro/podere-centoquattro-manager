import type { BookingForm } from "./types";

type DocumentsTabProps = {
  form: BookingForm;
  setForm: React.Dispatch<React.SetStateAction<BookingForm>>;
};

export default function DocumentsTab({
  form,
  setForm,
}: DocumentsTabProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">
        Documenti
      </h2>

      <p className="text-gray-500">
        DocumentsTab in costruzione...
      </p>
    </div>
  );
}