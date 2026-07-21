"use client";

import { useEffect, useMemo, useState } from "react";
import BookingHeader from "./booking-modal/BookingHeader";
import BookingFooter from "./booking-modal/BookingFooter";
import GuestTab from "./booking-modal/GuestTab";
import BookingTab from "./booking-modal/BookingTab";
import PaymentsTab from "./booking-modal/PaymentsTab";
import DocumentsTab from "./booking-modal/DocumentsTab";
import type { GuestForm } from "./booking-modal/types";

import type {
  Guest,
  Apartment,
  BookingForm,
  BookingModalProps,
} from "./booking-modal/types";

const DEFAULT_FORM: BookingForm = {
  apartment_id: 1,
  guest_id: null,

  check_in: "",
  check_out: "",

  adults: 2,
  children: 0,
  infants: 0,
  animals: 0,

  source: "Diretto",
  booking_code: "",
  status: "Confermata",

  total: "",
  deposit: "0",
  paid_amount: "0",
  tourist_tax: "0",

  paid: false,
  tourist_tax_paid: false,

  documents_received: false,
  alloggiati_sent: false,
  motourist_sent: false,

  notes: "",
};

export default function BookingModal({
  open,
  onClose,
  selectedDate,
  booking,
  onSaved,
}: BookingModalProps) {
  const [activeTab, setActiveTab] = useState<
    "guest" | "booking" | "payments" | "documents"
  >("guest");

  const [loading, setLoading] = useState(false);

  const [guests, setGuests] = useState<Guest[]>([]);
const [apartments, setApartments] = useState<Apartment[]>([]);

const [guestForm, setGuestForm] = useState<GuestForm>({
  id: null,

  nome: "",
  cognome: "",

  email: "",
  telefono: "",

  nazionalita: "",

  data_nascita: "",

  tipo_viaggio: "Famiglia",
  componenti: [],
});

const [form, setForm] =
  useState<BookingForm>(DEFAULT_FORM);

  useEffect(() => {
    if (!open) return;

    if (booking) {
      setForm({
        id: booking.id,

        apartment_id: booking.apartment_id,
        guest_id: booking.guest_id,

        check_in: booking.check_in ?? "",
        check_out: booking.check_out ?? "",

        adults: booking.adults ?? 2,
        children: booking.children ?? 0,
        infants: booking.infants ?? 0,
        animals: booking.animals ?? 0,

        source: booking.source ?? "Diretto",
        booking_code:
          booking.booking_code ?? "",

        status:
          booking.status ?? "Confermata",

        total:
          booking.total?.toString() ?? "",

        deposit:
          booking.deposit?.toString() ?? "0",

        paid_amount:
          booking.paid_amount?.toString() ?? "0",

        tourist_tax:
          booking.tourist_tax?.toString() ??
          "0",

        paid: booking.paid ?? false,

        tourist_tax_paid:
          booking.tourist_tax_paid ??
          false,

        documents_received:
          booking.documents_received ??
          false,

        alloggiati_sent:
          booking.alloggiati_sent ??
          false,

        motourist_sent:
          booking.motourist_sent ??
          false,

        notes: booking.notes ?? "",
      });
    } else {
      setForm({
        ...DEFAULT_FORM,
        check_in: selectedDate,
      });

      

      setGuestForm({
  id: null,
  nome: "",
  cognome: "",
  email: "",
  telefono: "",
  nazionalita: "",
  data_nascita: "",
  tipo_viaggio: "Famiglia",
  componenti: [],
});
      setActiveTab("guest");
    }
}, [booking, selectedDate, open]);
console.log("guest_id:", form.guest_id);
console.log("guests:", guests);

const selectedGuest = useMemo(
  
  () => guests.find((g) => g.id === form.guest_id),
  [guests, form.guest_id]
);

console.log("selectedGuest:", selectedGuest);
useEffect(() => {

  if (!selectedGuest) return;

  setGuestForm({
    id: selectedGuest.id,
    nome: selectedGuest.nome ?? "",
    cognome: selectedGuest.cognome ?? "",
    email: selectedGuest.email ?? "",
    telefono: selectedGuest.telefono ?? "",
    nazionalita: selectedGuest.nazionalita ?? "",
    data_nascita: selectedGuest.data_nascita ?? "",
    tipo_viaggio: selectedGuest.tipo_viaggio ?? "Famiglia",
    componenti: [],
  });
}, [selectedGuest]);

  if (!open) return null;

   async function salvaNuovoOspite(): Promise<number | null> {
  if (
    guestForm.nome.trim() === "" ||
    guestForm.cognome.trim() === ""
  ) {
    alert("Inserisci almeno nome e cognome.");
    return null;
  }

  try {
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: guestForm.nome,
        cognome: guestForm.cognome,
        email: guestForm.email,
        telefono: guestForm.telefono,
        nazionalita: guestForm.nazionalita,
        data_nascita: guestForm.data_nascita,
        tipo_viaggio: guestForm.tipo_viaggio,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.log(json);
      alert(JSON.stringify(json, null, 2));
      return null;
    }

    const guestId =
      json.data?.id ??
      json.id;

    if (!guestId) {
      alert("Impossibile recuperare l'id del nuovo ospite.");
      return null;
    }

    const guestsRes = await fetch("/api/guests");
    const guestsJson = await guestsRes.json();

    setGuests(guestsJson.data ?? []);

    setForm((prev) => ({
      ...prev,
      guest_id: guestId,
    }));

    return guestId;
  } catch (err) {
    console.error(err);
    alert("Errore durante il salvataggio dell'ospite.");
    return null;
  }
}
async function salvaPrenotazione() {
  setLoading(true);

  console.log("1️⃣ Entrato in salvaPrenotazione");
  try {

    console.log("2️⃣ Form:", form);

    if (!form.check_in || !form.check_out) {
      alert("Inserisci check-in e check-out.");
      return;
    }

    let guestId = form.guest_id;

    console.log("3️⃣ GuestId iniziale:", guestId);

   if (!guestId) {
  console.log("4️⃣ Creo nuovo ospite...");

  guestId = await salvaNuovoOspite();

  if (!guestId) {
    setLoading(false);
    return;
  }
}

    const payload = {
      ...form,
      guest_id: guestId,
    };

    console.log("6️⃣ Payload:", payload);

    const res = await fetch("/api/booking", {
      method: booking ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("7️⃣ Status:", res.status);

    const json = await res.json();

    console.log("8️⃣ JSON:", json);

    if (!res.ok || json.success === false) {
      console.log("9️⃣ Errore API:", json.error);
      alert(JSON.stringify(json.error));
      return;
    }

    console.log("✅ Prenotazione salvata");

    onSaved?.();
    onClose();

  } catch (err) {
    console.error("💥", err);
    alert("Errore imprevisto.");
  } finally {
    setLoading(false);
  }
}
async function eliminaPrenotazione() {
  if (!booking) return;

  const conferma = confirm(
    "Sei sicuro di voler eliminare questa prenotazione?"
  );

  if (!conferma) return;

  try {
    setLoading(true);

    const res = await fetch("/api/booking", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: booking.id,
      }),
    });

    const json = await res.json();

    if (!res.ok || json.success === false) {
      console.error(json.error);
      alert("Errore durante l'eliminazione.");
      return;
    }

    onSaved?.();

    onClose();

  } catch (err) {

    console.error(err);

    alert("Errore durante l'eliminazione.");

  } finally {

    setLoading(false);

  }
}
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div
  className="
    flex
    h-[100dvh]
    w-screen
    flex-col
    overflow-hidden
    bg-white
    lg:h-auto
    lg:max-h-[92vh]
    lg:w-[95vw]
    lg:max-w-6xl
    lg:rounded-2xl
    lg:shadow-2xl
  "
>

   <BookingHeader
  booking={booking}
  onClose={onClose}
/>

      {/* TABS */}

      <div className="border-b bg-gray-50">

        <div className="flex overflow-x-auto">

          <button
            onClick={() => setActiveTab("guest")}
            className={`px-6 py-4 font-medium transition ${
              activeTab === "guest"
                ? "border-b-4 border-green-600 bg-white text-green-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            👤 Ospite
          </button>

          <button
            onClick={() => setActiveTab("booking")}
            className={`px-6 py-4 font-medium transition ${
              activeTab === "booking"
                ? "border-b-4 border-green-600 bg-white text-green-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            🏡 Prenotazione
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`px-6 py-4 font-medium transition ${
              activeTab === "payments"
                ? "border-b-4 border-green-600 bg-white text-green-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            💶 Pagamenti
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            className={`px-6 py-4 font-medium transition ${
              activeTab === "documents"
                ? "border-b-4 border-green-600 bg-white text-green-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            📄 Documenti
          </button>

        </div>

      </div>

      {/* CONTENUTO */}

     <div
  className="
    flex-1
    overflow-y-auto
    p-4
    pb-32
    md:p-6
  "
>

        {activeTab === "guest" && (
 <GuestTab
  form={form}
  setForm={setForm}
  guests={guests}
  guestForm={guestForm}
  setGuestForm={setGuestForm}
/>
)}
  {activeTab === "booking" && (
  <BookingTab
    form={form}
    setForm={setForm}
    apartments={apartments}
  />
)}

       {activeTab === "payments" && (
  <PaymentsTab
    form={form}
    setForm={setForm}
  />
)}

        {activeTab === "documents" && (
  <DocumentsTab
    form={form}
    setForm={setForm}
  />
)}

      </div>

      ...
      </div> {/* fine CONTENUTO */}

      <BookingFooter
        booking={booking}
        loading={loading}
        onClose={onClose}
        onSave={salvaPrenotazione}
        onDelete={eliminaPrenotazione}
      />

    </div>
);
}
