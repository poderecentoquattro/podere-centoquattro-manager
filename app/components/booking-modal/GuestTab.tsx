import type { Dispatch, SetStateAction } from "react";
import type {
  Guest,
  GuestForm,
  BookingForm,
} from "./types";
import { useEffect } from "react";

type GuestTabProps = {
  form: BookingForm;
  setForm: Dispatch<SetStateAction<BookingForm>>;
  guests: Guest[];
  guestForm: GuestForm;
  setGuestForm: Dispatch<SetStateAction<GuestForm>>;
};

export default function GuestTab({
  form,
  setForm,
  guests,
  guestForm,
  setGuestForm,
}: GuestTabProps) {
  const selectedGuest = guests.find(
  (g) => g.id === form.guest_id
);

<div className="grid gap-5 mt-5 md:grid-cols-2">
  <div>
    <label className="mb-2 block font-medium">
      Email
    </label>

    <input
      value={guestForm.email}
      onChange={(e) =>
        setGuestForm((prev) => ({
          ...prev,
          email: e.target.value,
        }))
      }
      className="w-full rounded-lg border p-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Telefono
    </label>

    <input
      value={guestForm.telefono}
      onChange={(e) =>
        setGuestForm((prev) => ({
          ...prev,
          telefono: e.target.value,
        }))
      }
      className="w-full rounded-lg border p-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Provenienza
    </label>

    <input
      value={guestForm.nazionalita}
      onChange={(e) =>
        setGuestForm((prev) => ({
          ...prev,
          nazionalita: e.target.value,
        }))
      }
      className="w-full rounded-lg border p-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Data di nascita
    </label>

    <input
      type="date"
      value={guestForm.data_nascita}
      onChange={(e) =>
        setGuestForm((prev) => ({
          ...prev,
          data_nascita: e.target.value,
        }))
      }
      className="w-full rounded-lg border p-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Tipo viaggio
    </label>

    <select
      value={guestForm.tipo_viaggio}
      onChange={(e) =>
        setGuestForm((prev) => ({
          ...prev,
          tipo_viaggio: e.target.value as GuestForm["tipo_viaggio"],
        }))
      }
      className="w-full rounded-lg border p-3"
    >
      <option>Solo</option>
      <option>Coppia</option>
      <option>Famiglia</option>
      <option>Gruppo</option>
    </select>
  </div>
</div>

  return (
  <div className="space-y-8">
    <div className="rounded-xl border bg-white p-6">
      <h3 className="text-xl font-semibold text-gray-800">
  Ospite
</h3>

<p className="mb-6 text-sm text-gray-500">
  Seleziona un ospite esistente oppure inserisci i dati di un nuovo ospite.
</p>

<div className="mb-6">
  <label className="mb-2 block font-medium">
    Ospite
  </label>

  <select
    value={form.guest_id ?? ""}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        guest_id: e.target.value === "" ? null : Number(e.target.value),
      }))
    }
    className="w-full rounded-lg border p-3"
  >
    <option value="">Nuovo ospite...</option>

    {guests.map((g) => (
      <option key={g.id} value={g.id}>
        {g.cognome} {g.nome}
      </option>
    ))}
  </select>
</div>

<div className="grid gap-5 md:grid-cols-2">
  <div>
    <label className="mb-2 block font-medium">
      Nome
    </label>

    <input
      value={guestForm.nome}
      onChange={(e) =>
        setGuestForm((prev) => ({
          ...prev,
          nome: e.target.value,
        }))
      }
      className="w-full rounded-lg border p-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Cognome
    </label>

    <input
      value={guestForm.cognome}
      onChange={(e) =>
        setGuestForm((prev) => ({
          ...prev,
          cognome: e.target.value,
        }))
      }
      className="w-full rounded-lg border p-3"
    />
  </div>
</div>
    </div>
  </div>
);
}