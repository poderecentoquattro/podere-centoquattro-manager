import type { Dispatch, SetStateAction } from "react";
import type { GuestForm } from "../types";

export type TravelPartyProps = {
  tipoViaggio: GuestForm["tipo_viaggio"];
  guestForm: GuestForm;
  setGuestForm: Dispatch<SetStateAction<GuestForm>>;
};

export type PersonField = "nome" | "cognome" | "data_nascita";

export type MemberRole = "partner" | "child" | "member";