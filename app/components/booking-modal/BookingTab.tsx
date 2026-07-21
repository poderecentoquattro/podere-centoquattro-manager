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
<div className="mt-6">
  <h3 className="mb-4 text-lg font-semibold text-gray-800 border-b pb-2">
    🏠 Appartamento
  </h3>

  <label className="mb-2 block text-sm font-medium text-gray-600">
    Seleziona appartamento
  </label>

  <select
    value={form.apartment_id}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        apartment_id: Number(e.target.value),
      }))
    }
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
  >
    {apartments.map((apartment) => (
      <option
        key={apartment.id}
        value={apartment.id}
      >
        {apartment.name}
      </option>
    ))}
  </select>
</div>
      <div className="mt-8">
  <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
    📅 Date soggiorno
  </h3>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Check-in
      </label>

      <input
        type="date"
        value={form.check_in}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            check_in: e.target.value,
          }))
        }
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Check-out
      </label>

      <input
        type="date"
        value={form.check_out}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            check_out: e.target.value,
          }))
        }
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
    </div>
  </div>
</div>

<div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
  <div>
    <label className="mb-2 block text-sm font-medium">
      Adulti
    </label>

    <input
      type="number"
      min={0}
      value={form.adults}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          adults: Number(e.target.value),
        }))
      }
      className="w-full rounded-lg border px-3 py-2"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Bambini
    </label>

    <input
      type="number"
      min={0}
      value={form.children}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          children: Number(e.target.value),
        }))
      }
      className="w-full rounded-lg border px-3 py-2"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Neonati
    </label>

    <input
      type="number"
      min={0}
      value={form.infants}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          infants: Number(e.target.value),
        }))
      }
      className="w-full rounded-lg border px-3 py-2"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Animali
    </label>

    <input
      type="number"
      min={0}
      value={form.animals}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          animals: Number(e.target.value),
        }))
      }
      className="w-full rounded-lg border px-3 py-2"
    />
  </div>
</div>
<div className="mt-8">
  <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
    🌐 Prenotazione
  </h3>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Provenienza
      </label>

      <select
        value={form.source}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            source: e.target.value,
          }))
        }
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        <option value="Diretto">Diretto</option>
        <option value="Booking">Booking</option>
        <option value="Airbnb">Airbnb</option>
        <option value="Expedia">Expedia</option>
      </select>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Stato
      </label>

      <select
        value={form.status}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            status: e.target.value,
          }))
        }
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        <option value="Confermata">Confermata</option>
        <option value="In attesa">In attesa</option>
        <option value="Annullata">Annullata</option>
      </select>
    </div>
  </div>

  <div className="mt-4">
    <label className="mb-2 block text-sm font-medium text-gray-600">
      Codice prenotazione
    </label>

    <input
      type="text"
      value={form.booking_code}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          booking_code: e.target.value,
        }))
      }
      placeholder="Es. BK-2026-001"
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
    />
  </div>
</div>

<div className="mt-8">
  <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
    📝 Note operative
  </h3>

  <textarea
    value={form.notes}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        notes: e.target.value,
      }))
    }
    rows={6}
    placeholder="Scrivi qui tutte le informazioni utili sulla prenotazione..."
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none resize-y"
  />
</div>
    </div>
  );
}