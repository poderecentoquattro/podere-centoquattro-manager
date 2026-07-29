import { useEffect, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import type {
  BookingForm,
  Guest,
  GuestForm,
} from "./types";

import TravelParty from "./TravelParty";
import { getPartner } from "./TravelParty/helpers";
import { createMember } from "./TravelParty/factories";
import { addMember } from "./TravelParty/actions";

type GuestTabProps = {
  form: BookingForm;
  setForm: Dispatch<SetStateAction<BookingForm>>;
  guests: Guest[];
  guestForm: GuestForm;
  setGuestForm: Dispatch<SetStateAction<GuestForm>>;
};

const travelTypes = [
  {
    value: "solo",
    label: "Solo",
    emoji: "👤",
  },
  {
    value: "couple",
    label: "Coppia",
    emoji: "❤️",
  },
  {
    value: "family",
    label: "Famiglia",
    emoji: "👨‍👩‍👧‍👦",
  },
  {
    value: "group",
    label: "Gruppo",
    emoji: "👥",
  },
] as const;

export default function GuestTab({
  form,
  setForm,
  guests,
  guestForm,
  setGuestForm,
}: GuestTabProps) {

// =========================
// MEMOS
// =========================

const selectedGuest = useMemo(
  () => guests.find((g) => g.id === form.guest_id),
  [guests, form.guest_id]
);

useEffect(() => {
  if (!selectedGuest) return;

  if (guestForm.id === selectedGuest.id) {
    return;
  }

  async function loadGuest(guest: typeof selectedGuest) {
    if (!guest) return;
    const res = await fetch(
      `/api/componenti-viaggio?guestId=${guest.id}`
    );

    const { data } = await res.json();

    setGuestForm({
      id: guest.id,
      nome: guest.nome ?? "",
      cognome: guest.cognome ?? "",
      email: guest.email ?? "",
      telefono: guest.telefono ?? "",
      nazionalita: guest.nazionalita ?? "",
      data_nascita: guest.data_nascita ?? "",
      tipo_viaggio: guest.tipo_viaggio ?? "family",
      componenti: data ?? [],
    });
  }

  loadGuest(selectedGuest);
}, [selectedGuest, guestForm.id]);

const updateGuestField = <K extends keyof GuestForm>(
  field: K,
  value: GuestForm[K]
) => {
  setGuestForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const updateTravelType = (
  tipo: GuestForm["tipo_viaggio"]
) => {
  setGuestForm((prev) => ({
    ...prev,
    tipo_viaggio: tipo,
  }));
};

  return (
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
              guest_id:
                e.target.value === ""
                  ? null
                  : Number(e.target.value),
            }))
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Nuovo ospite...
          </option>

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
    updateGuestField("nome", e.target.value)
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
    updateGuestField("cognome", e.target.value)
  }
  className="w-full rounded-lg border p-3"
/>
        </div>

      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
  value={guestForm.email}
  onChange={(e) =>
    updateGuestField("email", e.target.value)
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
    updateGuestField("telefono", e.target.value)
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
    updateGuestField("nazionalita", e.target.value)
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
    updateGuestField("data_nascita", e.target.value)
  }
  className="w-full rounded-lg border p-3"
/>
        </div>

          <div className="md:col-span-2">
          <label className="mb-3 block font-medium">
            Tipo di viaggio
          </label>

          <div className="grid grid-cols-2 gap-3">
            {travelTypes.map((tipo) => (
              <button
                key={tipo.value}
                type="button"
                onClick={() =>
  updateTravelType(
    tipo.value as GuestForm["tipo_viaggio"]
  )
}

                className={`rounded-xl border p-4 transition ${
                  guestForm.tipo_viaggio === tipo.value
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300 hover:border-green-300"
                }`}
              >
                <div className="text-3xl">{tipo.emoji}</div>
                <div className="mt-2 font-semibold">
                  {tipo.label}
                </div>
              </button>
            ))}
          </div>
        </div>

            </div>

      <TravelParty
        tipoViaggio={guestForm.tipo_viaggio}
        guestForm={guestForm}
        setGuestForm={setGuestForm}
      />

    </div>
  );
}