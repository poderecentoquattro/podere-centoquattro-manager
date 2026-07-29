import MemberCard from "./MemberCard";
import type { TravelPartyProps } from "./types";
import { createMember } from "./factories";

export default function GroupSection({
  guestForm,
  setGuestForm,
}: TravelPartyProps) {
  const members = guestForm.componenti.filter(
    (c) => c.ruolo === "member"
  );

  const addMember = () => {
    setGuestForm((prev) => ({
      ...prev,
      componenti: [
        ...prev.componenti,
        createMember("member"),
      ],
    }));
  };

  const updateMember = (
    id: string,
    field: "nome" | "cognome" | "data_nascita",
    value: string
  ) => {
    setGuestForm((prev) => ({
      ...prev,
      componenti: prev.componenti.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const removeMember = (id: string) => {
    setGuestForm((prev) => ({
      ...prev,
      componenti: prev.componenti.filter((c) => c.id !== id),
    }));
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">👥 Componenti del gruppo</h3>

        <button
          type="button"
          onClick={addMember}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          + Aggiungi partecipante
        </button>
      </div>

      {members.map((member, index) => (
        <MemberCard
          key={member.id}
          title={`Partecipante ${index + 1}`}
          person={member}
          onChange={(field, value) =>
            updateMember(member.id, field, value)
          }
          onRemove={() => removeMember(member.id)}
        />
      ))}
    </div>
  );
}