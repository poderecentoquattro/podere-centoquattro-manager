import type { TravelMember } from "../types";
import type { MemberRole } from "./types";

export function createMember(ruolo: MemberRole): TravelMember {
  return {
    id: crypto.randomUUID(),
    nome: "",
    cognome: "",
    data_nascita: "",
    sesso: undefined,
    ruolo,
  };
}