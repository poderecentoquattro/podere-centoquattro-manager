import ProformaPreview from "../documents/ProformaPreview";

import type {
  BookingForm,
  GuestForm,
  Apartment,
} from "./types";

type DocumentsTabProps = {
  form: BookingForm;
  setForm: React.Dispatch<React.SetStateAction<BookingForm>>;
  guestForm: GuestForm;
  apartments: Apartment[];
};

export default function DocumentsTab({
  form,
  setForm,
  guestForm,
  apartments,
}: DocumentsTabProps) {
  const apartment =
    apartments.find((a) => a.id === form.apartment_id) ?? null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              📄 Proforma
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Genera automaticamente la proforma della prenotazione.
            </p>
          </div>

          <button className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700">
            Genera Proforma
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-10">
        <ProformaPreview
          booking={form}
          guest={guestForm}
          apartment={apartment}
        />
      </div>
    </div>
  );
}