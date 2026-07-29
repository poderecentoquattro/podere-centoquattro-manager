type Person = {
  nome: string;
  cognome: string;
  data_nascita?: string;
};

type PersonCardProps = {
  title: string;
  person: Person;

  onChange: (
    field: keyof Person,
    value: string
  ) => void;

  onRemove?: () => void;
};

export default function PersonCard({
  title,
  person,
  onChange,
  onRemove,
}: PersonCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3 bg-gray-50">

      <div className="flex justify-between items-center">
        <h4 className="font-semibold">
          {title}
        </h4>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 text-sm hover:underline"
          >
            Elimina
          </button>
        )}
      </div>

      <input
        className="w-full border rounded p-2"
        placeholder="Nome"
        value={person.nome}
        onChange={(e) =>
          onChange("nome", e.target.value)
        }
      />

      <input
        className="w-full border rounded p-2"
        placeholder="Cognome"
        value={person.cognome}
        onChange={(e) =>
          onChange("cognome", e.target.value)
        }
      />

      <input
        type="date"
        className="w-full border rounded p-2"
        value={person.data_nascita}
        onChange={(e) =>
          onChange("data_nascita", e.target.value)
        }
      />
    </div>
  );
}