export type Person = {
  nome: string;
  cognome: string;

  data_nascita?: string;

  sesso?: "M" | "F";
};

export type Guest = Person & {
  id: number;

  email?: string;
  telefono?: string;

  nazionalita?: string;

  tipo_viaggio?: "solo" | "couple" | "family" | "group";
};

export type TravelMember = {
  id: string;

  nome: string;
  cognome: string;

  ruolo: "partner" | "child" | "member";

  data_nascita?: string;

  sesso?: "M" | "F";
};

export type GuestForm = {
  id: number | null;

  nome: string;
  cognome: string;

  email: string;
  telefono: string;

  nazionalita: string;

  data_nascita: string;

  tipo_viaggio: "solo" | "couple" | "family" | "group";

  componenti: TravelMember[];
};

export type Apartment = {
  id: number;
  name: string;
  color?: string;
  max_guests: number;
  active: boolean;
};

export type BookingForm = {
  id?: number;

  apartment_id: number;
  guest_id: number | null;

  check_in: string;
  check_out: string;

  adults: number;
  children: number;
  infants: number;
  animals: number;

  travel_type: "solo" | "couple" | "family" | "group";
travel_reason: "holiday" | "work";

  source: string;
  booking_code: string;
  status: string;

  total: string;
  deposit: string;
  paid_amount: string;
  balance: string;
 deposit_payment_method: string;
balance_payment_method: string;

commissionable_amount: string;
ota_commission: string;
payment_commission: string;

payout_date: string;
payout_amount: string;
payout_status: string;
payout_reference: string;

tourist_tax: string;

  paid: boolean;
  tourist_tax_paid: boolean;

  documents_received: boolean;
  alloggiati_sent: boolean;
  motourist_sent: boolean;

  notes: string;
};

export type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  selectedDate: string;
  booking?: any;
  onSaved?: () => void;
};