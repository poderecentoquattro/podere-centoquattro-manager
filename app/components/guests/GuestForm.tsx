"use client";

import { useEffect, useState } from "react";

type TipoViaggio = "solo" | "famiglia" | "gruppo";

type ComponenteViaggio = {
  nome: string;
  cognome: string;
  relazione: string;
  data_nascita: string;
};

type Guest = {
  nome: string;
  cognome: string;
  data_nascita: string;
  nazionalita: string;
  telefono: string;
  email: string;
  note: string;
  tipo_viaggio: TipoViaggio;
  componenti_viaggio: ComponenteViaggio[];
};

type Props = {
  initialData?: Guest;
  onSubmit: (guest: Guest) => Promise<void>;
};

const emptyGuest: Guest = {
  nome: "",
  cognome: "",
  data_nascita: "",
  nazionalita: "",
  telefono: "",
  email: "",
  note: "",
  tipo_viaggio: "solo",
  componenti_viaggio: [],
};

export default function GuestForm({
  initialData,
  onSubmit,
}: Props) {
  const [guest, setGuest] = useState<Guest>(
    initialData ?? emptyGuest
  );

  useEffect(() => {
    if (initialData) {
      setGuest(initialData);
    } else {
      setGuest(emptyGuest);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    });
  };

  const addComponente = () => {
    setGuest({
      ...guest,
      componenti_viaggio: [
        ...guest.componenti_viaggio,
        {
          nome: "",
          cognome: "",
          relazione: "",
          data_nascita: "",
        },
      ],
    });
  };

  const updateComponente = (
    index: number,
    field: keyof ComponenteViaggio,
    value: string
  ) => {
    const nuovi = [...guest.componenti_viaggio];
    nuovi[index][field] = value;

    setGuest({
      ...guest,
      componenti_viaggio: nuovi,
    });
  };

  const removeComponente = (index: number) => {
    setGuest({
      ...guest,
      componenti_viaggio: guest.componenti_viaggio.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(guest);
      }}
      className="space-y-8"
    >
      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold text-[#0A5A34]">
          👤 Dati Ospite
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Nome
            </label>

            <input
              name="nome"
              value={guest.nome}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Cognome
            </label>

            <input
              name="cognome"
              value={guest.cognome}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Data di nascita
            </label>

            <input
              type="date"
              name="data_nascita"
              value={guest.data_nascita}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Nazionalità
            </label>

            <input
              name="nazionalita"
              value={guest.nazionalita}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Telefono
            </label>

            <input
              name="telefono"
              value={guest.telefono}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={guest.email}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold text-[#0A5A34]">
          ✈️ Come viaggia
        </h2>

        <div className="flex gap-8">
          <label>
            <input
              type="radio"
              name="tipo_viaggio"
              value="solo"
              checked={guest.tipo_viaggio === "solo"}
              onChange={handleChange}
            />{" "}
            Da solo
          </label>

          <label>
            <input
              type="radio"
              name="tipo_viaggio"
              value="famiglia"
              checked={guest.tipo_viaggio === "famiglia"}
              onChange={handleChange}
            />{" "}
            In famiglia
          </label>

          <label>
            <input
              type="radio"
              name="tipo_viaggio"
              value="gruppo"
              checked={guest.tipo_viaggio === "gruppo"}
              onChange={handleChange}
            />{" "}
            In gruppo
          </label>
        </div>
      </div>

      {guest.tipo_viaggio !== "solo" && (
        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0A5A34]">
              {guest.tipo_viaggio === "famiglia"
                ? "👨‍👩‍👧‍👦 Componenti della famiglia"
                : "👥 Componenti del gruppo"}
            </h2>

            <button
              type="button"
              onClick={addComponente}
              className="rounded-xl bg-[#0A5A34] px-4 py-2 text-white"
            >
              + Aggiungi componente
            </button>
          </div>

          <div className="space-y-6">
            {guest.componenti_viaggio.map((c, index) => (
              <div
                key={index}
                className="rounded-xl border p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    placeholder="Nome"
                    value={c.nome}
                    onChange={(e) =>
                      updateComponente(
                        index,
                        "nome",
                        e.target.value
                      )
                    }
                    className="rounded-xl border p-3"
                  />

                  <input
                    placeholder="Cognome"
                    value={c.cognome}
                    onChange={(e) =>
                      updateComponente(
                        index,
                        "cognome",
                        e.target.value
                      )
                    }
                    className="rounded-xl border p-3"
                  />

                  <select
                    value={c.relazione}
                    onChange={(e) =>
                      updateComponente(
                        index,
                        "relazione",
                        e.target.value
                      )
                    }
                    className="rounded-xl border p-3"
                  >
                    <option value="">
                      Seleziona...
                    </option>

                    {guest.tipo_viaggio ===
                    "famiglia" ? (
                      <>
                        <option>Coniuge</option>
                        <option>Figlio</option>
                        <option>Figlia</option>
                        <option>Padre</option>
                        <option>Madre</option>
                        <option>Fratello</option>
                        <option>Sorella</option>
                        <option>Altro</option>
                      </>
                    ) : (
                      <>
                        <option>Amico</option>
                        <option>Amica</option>
                        <option>Collega</option>
                        <option>Parente</option>
                        <option>Altro</option>
                      </>
                    )}
                  </select>

                  <input
                    type="date"
                    value={c.data_nascita}
                    onChange={(e) =>
                      updateComponente(
                        index,
                        "data_nascita",
                        e.target.value
                      )
                    }
                    className="rounded-xl border p-3"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeComponente(index)
                  }
                  className="mt-4 text-red-600"
                >
                  🗑 Elimina componente
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold text-[#0A5A34]">
          📝 Note
        </h2>

        <textarea
          name="note"
          value={guest.note}
          onChange={handleChange}
          rows={6}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-[#0A5A34] px-8 py-3 font-semibold text-white hover:bg-[#084728]"
        >
          💾 Salva Ospite
        </button>
      </div>
    </form>
  );
}