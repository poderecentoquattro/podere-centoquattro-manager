import type { TravelMember } from "../types";
import type { PersonField } from "./types";

export function updateMember(
  componenti: TravelMember[],
  memberId: string,
  field: PersonField,
  value: string
): TravelMember[] {
  return componenti.map((member) =>
    member.id === memberId
      ? {
          ...member,
          [field]: value,
        }
      : member
  );
}

export function addMember(
  componenti: TravelMember[],
  member: TravelMember
): TravelMember[] {
  return [...componenti, member];
}