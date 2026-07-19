import type { Dispatch, SetStateAction } from "react";
import type { Guest, BookingForm } from "./types";

type NewGuest = {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  nazionalita: string;
  data_nascita: string;
  luogo_nascita: string;
  lingua: string;
};

type GuestTabProps = {
  form: BookingForm;
  setForm: Dispatch<SetStateAction<BookingForm>>;
  guests: Guest[];
  selectedGuest?: Guest;
  creatingGuest: boolean;
  setCreatingGuest: Dispatch<SetStateAction<boolean>>;
  newGuest: NewGuest;
  setNewGuest: Dispatch<SetStateAction<NewGuest>>;
};

export default function GuestTab({
  form,
  setForm,
  guests,
  selectedGuest,
  creatingGuest,
  setCreatingGuest,
  newGuest,
  setNewGuest,
}: GuestTabProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Ospite
            </h3>

            <p className="text-sm text-gray-500">
              Seleziona un ospite esistente oppure creane uno nuovo.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setCreatingGuest(!creatingGuest);

              if (!creatingGuest) {
                setForm({
                  ...form,
                  guest_id: null,
                });
              }
            }}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            {creatingGuest
              ? "↩ Ospite esistente"
              : "➕ Nuovo ospite"}
          </button>
        </div>

        {!creatingGuest && (
          <>
            <label className="mb-2 block font-medium">
              Ospite
            </label>

            <select
              value={form.guest_id ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  guest_id:
                    e.target.value === ""
                      ? null
                      : Number(e.target.value),
                })
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Seleziona ospite...
              </option>

              {guests.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.cognome} {g.nome}
                </option>
              ))}
            </select>

            {selectedGuest && (
              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase text-gray-500">
                      Email
                    </div>

                    <div className="font-medium">
                      {selectedGuest.email || "-"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500">
                      Telefono
                    </div>

                    <div className="font-medium">
                      {selectedGuest.telefono || "-"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500">
                      Nazionalità
                    </div>

                    <div className="font-medium">
                      {selectedGuest.nazionalita || "-"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-gray-500">
                      Lingua
                    </div>

                    <div className="font-medium">
                      {selectedGuest.lingua || "-"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {creatingGuest && (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Nome
              </label>

              <input
                value={newGuest.nome}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    nome: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Cognome
              </label>

              <input
                value={newGuest.cognome}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    cognome: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>
                        <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                value={newGuest.email}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Telefono
              </label>

              <input
                value={newGuest.telefono}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    telefono: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Nazionalità
              </label>

              <input
                value={newGuest.nazionalita}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    nazionalita: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Lingua
              </label>

              <input
                value={newGuest.lingua}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    lingua: e.target.value,
                  })
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
                value={newGuest.data_nascita}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    data_nascita: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Luogo di nascita
              </label>

              <input
                value={newGuest.luogo_nascita}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    luogo_nascita: e.target.value,
                  })
                }
                className="w-full rounded-lg border p-3"
             />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}