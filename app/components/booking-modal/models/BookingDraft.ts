import type {
  BookingForm,
  GuestForm,
} from "../types";

export interface BookingDraft {
  booking: BookingForm;
  guests: GuestForm[];
}