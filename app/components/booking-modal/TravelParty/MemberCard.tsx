import type { Person, TravelMember } from "../types";
import type { PersonField } from "./types";

type PersonCardProps = {
  title: string;
  person: Person | TravelMember;
  onChange: (field: PersonField, value: string) => void;
  onRemove?: () => void;
};

export default function PersonCard({
  title,
  person,
  onChange,
  onRemove,
}: PersonCardProps) {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <h3 className="font-semibold">{title}</h3>

      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Nome"
        value={person.nome}
        onChange={(e) => onChange("nome", e.target.value)}
      />

      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Cognome"
        value={person.cognome}
        onChange={(e) => onChange("cognome", e.target.value)}
      />

      <input
        className="w-full rounded border px-3 py-2"
        type="date"
        value={person.data_nascita ?? ""}
        onChange={(e) => onChange("data_nascita", e.target.value)}
      />

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded bg-red-600 px-3 py-2 text-white"
        >
          Elimina
        </button>
      )}
    </div>
  );
}