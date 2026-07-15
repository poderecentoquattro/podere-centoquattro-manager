export type Guest = {
  id: number;

  nome: string;
  cognome: string;

  email: string | null;
  telefono: string | null;

  nazionalita: string | null;

  data_nascita: string | null;
  luogo_nascita: string | null;

  lingua: string | null;

  notes: string | null;
};