export type Guest = {
  id: number;
  nome: string;
  cognome: string;
  email?: string;
  telefono?: string;
  nazionalita?: string;
  data_nascita?: string;
  luogo_nascita?: string;
  lingua?: string;
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

  source: string;
  booking_code: string;
  status: string;

  total: string;
  deposit: string;
  paid_amount: string;
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