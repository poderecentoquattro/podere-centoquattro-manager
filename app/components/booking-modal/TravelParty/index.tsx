import CoupleSection from "./CoupleSection";
import FamilySection from "./FamilySection";
import GroupSection from "./GroupSection";

import type { TravelPartyProps } from "./types";

export default function TravelParty({
  tipoViaggio,
  guestForm,
  setGuestForm,
}: TravelPartyProps) {
  switch (tipoViaggio) {
    case "solo":
      return null;

    case "couple":
      return (
        <CoupleSection
          tipoViaggio={tipoViaggio}
          guestForm={guestForm}
          setGuestForm={setGuestForm}
        />
      );

    case "family":
      return (
        <FamilySection
          tipoViaggio={tipoViaggio}
          guestForm={guestForm}
          setGuestForm={setGuestForm}
        />
      );

    case "group":
      return (
        <GroupSection
          tipoViaggio={tipoViaggio}
          guestForm={guestForm}
          setGuestForm={setGuestForm}
        />
      );

    default:
      return null;
  }
}