import type { TravelMember } from "../types";

export const getPartner = (componenti: TravelMember[]) =>
  componenti.find((m) => m.ruolo === "partner");

export const getChildren = (componenti: TravelMember[]) =>
  componenti.filter((m) => m.ruolo === "child");

export const getGroupMembers = (componenti: TravelMember[]) =>
  componenti.filter((m) => m.ruolo === "member");