  // ======================================================
  // IMPORT
  // ======================================================

import MemberCard from "./MemberCard";
import type { TravelPartyProps } from "./types";
import { getPartner } from "./helpers";
import { createMember } from "./factories";
import { updateMember } from "./actions";

export default function CoupleSection({
  guestForm,
  setGuestForm,
}: TravelPartyProps) {
  const partner =
  getPartner(guestForm.componenti) ?? createMember("partner");

  const updatePartner = (
    field: "nome" | "cognome" | "data_nascita",
    value: string
  ) => {
    console.log("updatePartner", field, value);

    setGuestForm((prev) => {
      console.log("PRIMA", prev.componenti);

      const partner =
  getPartner(guestForm.componenti) ?? createMember("partner");

      const altri = prev.componenti.filter(
        (c) => c.ruolo !== "partner"
      );

      const nuovo = {
        ...prev,
        componenti: [
          ...altri,
          {
            ...partner,
            [field]: value,
          },
        ],
      };

      console.log("DOPO", nuovo.componenti);

      return nuovo;
    });
  };

  return (
    <div className="mt-6">
      <MemberCard
        title="❤️ Partner"
        person={partner}
        onChange={(field, value) => updatePartner(field, value)}
      />
    </div>
  );
}