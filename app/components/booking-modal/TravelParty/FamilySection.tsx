import MemberCard from "./MemberCard";
import type { TravelPartyProps } from "./types";
import { createMember } from "./factories";
import { getPartner } from "./helpers";

export default function FamilySection({
  guestForm,
  setGuestForm,
}: TravelPartyProps) {
  const partner =
    getPartner(guestForm.componenti) ?? createMember("partner");

  const children = guestForm.componenti.filter(
    (c) => c.ruolo === "child"
  );

  const updatePartner = (
    field: "nome" | "cognome" | "data_nascita",
    value: string
  ) => {
    setGuestForm((prev) => {
      const partner =
        getPartner(prev.componenti) ?? createMember("partner");

      const altri = prev.componenti.filter(
        (c) => c.ruolo !== "partner"
      );

      return {
        ...prev,
        componenti: [
          ...altri,
          {
            ...partner,
            [field]: value,
          },
        ],
      };
    });
  };

  const updateChild = (
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

  const addChild = () => {
    setGuestForm((prev) => ({
      ...prev,
      componenti: [
        ...prev.componenti,
        createMember("child"),
      ],
    }));
  };

  const removeChild = (id: string) => {
    setGuestForm((prev) => ({
      ...prev,
      componenti: prev.componenti.filter((c) => c.id !== id),
    }));
  };

  return (
    <div className="mt-6 space-y-6">
      <MemberCard
        title="❤️ Partner"
        person={partner}
        onChange={updatePartner}
      />

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">👶 Figli</h3>

        <button
          type="button"
          onClick={addChild}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          + Aggiungi figlio
        </button>
      </div>

      {children.map((child, index) => (
        <MemberCard
          key={child.id}
          title={`Figlio ${index + 1}`}
          person={child}
          onChange={(field, value) =>
            updateChild(child.id, field, value)
          }
          onRemove={() => removeChild(child.id)}
        />
      ))}
    </div>
  );
}