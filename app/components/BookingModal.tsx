"use client";

import { useEffect, useMemo, useState } from "react";

type Guest = {
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

type Apartment = {
  id: number;
  name: string;
  color?: string;
  max_guests: number;
  active: boolean;
};

type BookingForm = {
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

type Props = {
  open: boolean;
  onClose: () => void;
  selectedDate: string;
  booking?: any;
  onSaved?: () => void;
};

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
}: Props) {
  const [activeTab, setActiveTab] = useState<
    "guest" | "booking" | "payments" | "documents"
  >("guest");

  const [loading, setLoading] = useState(false);

  const [guests, setGuests] = useState<Guest[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [creatingGuest, setCreatingGuest] =
    useState(false);

  const [newGuest, setNewGuest] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    nazionalita: "Italia",
    data_nascita: "",
    luogo_nascita: "",
    lingua: "Italiano",
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

      setCreatingGuest(false);

      setNewGuest({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        nazionalita: "Italia",
        data_nascita: "",
        luogo_nascita: "",
        lingua: "Italiano",
      });

      setActiveTab("guest");
    }
  }, [booking, selectedDate, open]);
useEffect(() => {
  if (!open) return;

  async function loadData() {
    try {
      const [guestsRes, apartmentsRes] = await Promise.all([
        fetch("/api/guests"),
        fetch("/api/apartments"),
      ]);

      const guestsJson = await guestsRes.json();
      const apartmentsJson = await apartmentsRes.json();

      if (guestsJson.success) {
        setGuests(guestsJson.data);
      }

      if (apartmentsJson.success) {
        setApartments(apartmentsJson.data);
      }
    } catch (err) {
      console.error("Errore caricamento dati:", err);
    }
  }

  loadData();
}, [open]);
  const selectedGuest = useMemo(() => {
    return guests.find(
      (g) => g.id === form.guest_id
    );
  }, [guests, form.guest_id]);

  if (!open) return null;

    async function salvaNuovoOspite(): Promise<number | null> {
  if (!creatingGuest) return form.guest_id;

  if (
    newGuest.nome.trim() === "" ||
    newGuest.cognome.trim() === ""
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
      body: JSON.stringify(newGuest),
    });

    const json = await res.json();

   if (!res.ok) {
  console.log(json);
  alert(JSON.stringify(json, null, 2));
  return null;
}

    // supporta sia {data:{id}} che {id}
    const guestId =
      json.data?.id ??
      json.id;

    if (!guestId) {
      alert("Impossibile recuperare l'id del nuovo ospite.");
      return null;
    }

    // aggiorna la lista ospiti
    const guestsRes = await fetch("/api/guests");
    const guestsJson = await guestsRes.json();

    setGuests(guestsJson.data ?? []);

    setForm(prev => ({
      ...prev,
      guest_id: guestId,
    }));

    setCreatingGuest(false);

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

    if (creatingGuest) {
      console.log("4️⃣ Salvo nuovo ospite...");
      guestId = await salvaNuovoOspite();

      console.log("5️⃣ GuestId creato:", guestId);

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

      {/* HEADER */}

      <div className="border-b bg-gradient-to-r from-green-700 to-green-600 px-4 py-3 md:px-6 md:py-5 text-white">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl md:text-3xl font-bold">

              {booking
                ? "Modifica Prenotazione"
                : "Nuova Prenotazione"}

            </h2>

            <p className="mt-1 text-sm text-green-100">

              Gestisci ospiti, soggiorno, pagamenti e documenti

            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-white/20 px-3 py-2 text-xl hover:bg-white/30"
          >
            ✕
          </button>

        </div>

      </div>

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

<div className="space-y-8">

<div className="rounded-xl border bg-white pp-4 md:p-6-6">

<div className="mb-4 flex items-center justify-between">

<div>

<h3 className="text-xl font-semibold text-gray-800">
Ospite
</h3>

<p className="text-sm text-gray-500">
Seleziona un ospite esistente oppure creane uno nuovo.
</p>

</div>

<button
type="button"
onClick={()=>{
setCreatingGuest(!creatingGuest);

if(!creatingGuest){
setForm({
...form,
guest_id:null
});
}
}}
className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
>

{creatingGuest ? "↩ Ospite esistente" : "➕ Nuovo ospite"}

</button>

</div>

{!creatingGuest && (

<div>

<label className="mb-2 block font-medium">

Ospite

</label>

<select
value={form.guest_id ?? ""}
onChange={(e)=>
setForm({
...form,
guest_id:
e.target.value===""
?null
:Number(e.target.value)
})
}
className="w-full rounded-lg border p-3"
>

<option value="">
Seleziona ospite...
</option>

{guests.map(g=>(
<option
key={g.id}
value={g.id}
>

{g.cognome} {g.nome}

</option>
))}

</select>

{selectedGuest && (

<div className="mt-5 rounded-lg bg-gray-50 p-4">

<div className="grid gap-4 md:grid-cols-2">

<div>

<div className="text-xs uppercase text-gray-500">
Email
</div>

<div className="font-medium">

{selectedGuest.email || "-"}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">
Telefono
</div>

<div className="font-medium">

{selectedGuest.telefono || "-"}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">
Nazionalità
</div>

<div className="font-medium">

{selectedGuest.nazionalita || "-"}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">
Lingua
</div>

<div className="font-medium">

{selectedGuest.lingua || "-"}

</div>

</div>

</div>

</div>

)}

</div>

)}

{creatingGuest && (

<div className="grid gap-5 md:grid-cols-2">

<div>

<label className="mb-2 block font-medium">

Nome

</label>

<input
value={newGuest.nome}
onChange={(e)=>
setNewGuest({
...newGuest,
nome:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Cognome

</label>

<input
value={newGuest.cognome}
onChange={(e)=>
setNewGuest({
...newGuest,
cognome:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Email

</label>

<input
value={newGuest.email}
onChange={(e)=>
setNewGuest({
...newGuest,
email:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Telefono

</label>

<input
value={newGuest.telefono}
onChange={(e)=>
setNewGuest({
...newGuest,
telefono:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Nazionalità

</label>

<input
value={newGuest.nazionalita}
onChange={(e)=>
setNewGuest({
...newGuest,
nazionalita:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Lingua

</label>

<input
value={newGuest.lingua}
onChange={(e)=>
setNewGuest({
...newGuest,
lingua:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Data di nascita

</label>

<input
type="date"
value={newGuest.data_nascita}
onChange={(e)=>
setNewGuest({
...newGuest,
data_nascita:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

<div>

<label className="mb-2 block font-medium">

Luogo di nascita

</label>

<input
value={newGuest.luogo_nascita}
onChange={(e)=>
setNewGuest({
...newGuest,
luogo_nascita:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

</div>

)}

</div>

</div>

)}

        {activeTab === "booking" && (

<div className="space-y-8">

<div className="rounded-xl border bg-white p-4 md:p-6">

<h3 className="mb-6 text-xl font-semibold text-gray-800">
Prenotazione
</h3>

<div className="grid gap-5 md:grid-cols-2">

{/* APPARTAMENTO */}

<div>

<label className="mb-2 block font-medium">

Appartamento

</label>

<select
value={form.apartment_id}
onChange={(e)=>
setForm({
...form,
apartment_id:Number(e.target.value)
})
}
className="w-full rounded-lg border p-3"
>

{apartments.map(a=>(

<option
key={a.id}
value={a.id}
>

{a.name}

</option>

))}

</select>

</div>

{/* PORTALE */}

<div>

<label className="mb-2 block font-medium">

Portale

</label>

<select
value={form.source}
onChange={(e)=>
setForm({
...form,
source:e.target.value
})
}
className="w-full rounded-lg border p-3"
>

<option>Diretto</option>
<option>Booking</option>
<option>Airbnb</option>
<option>Vrbo</option>
<option>Expedia</option>
<option>Altro</option>

</select>

</div>

{/* CHECK IN */}

<div>

<label className="mb-2 block font-medium">

Check-in

</label>

<input
type="date"
value={form.check_in}
onChange={(e)=>
setForm({
...form,
check_in:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* CHECK OUT */}

<div>

<label className="mb-2 block font-medium">

Check-out

</label>

<input
type="date"
value={form.check_out}
onChange={(e)=>
setForm({
...form,
check_out:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* ADULTI */}

<div>

<label className="mb-2 block font-medium">

Adulti

</label>

<input
type="number"
min={1}
value={form.adults}
onChange={(e)=>
setForm({
...form,
adults:Number(e.target.value)
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* BAMBINI */}

<div>

<label className="mb-2 block font-medium">

Bambini

</label>

<input
type="number"
min={0}
value={form.children}
onChange={(e)=>
setForm({
...form,
children:Number(e.target.value)
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* NEONATI */}

<div>

<label className="mb-2 block font-medium">

Neonati

</label>

<input
type="number"
min={0}
value={form.infants}
onChange={(e)=>
setForm({
...form,
infants:Number(e.target.value)
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* ANIMALI */}

<div>

<label className="mb-2 block font-medium">

Animali

</label>

<input
type="number"
min={0}
value={form.animals}
onChange={(e)=>
setForm({
...form,
animals:Number(e.target.value)
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* CODICE */}

<div className="md:col-span-2">

<label className="mb-2 block font-medium">

Codice prenotazione

</label>

<input
value={form.booking_code}
onChange={(e)=>
setForm({
...form,
booking_code:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* STATO */}

<div className="md:col-span-2">

<label className="mb-2 block font-medium">

Stato prenotazione

</label>

<select
value={form.status}
onChange={(e)=>
setForm({
...form,
status:e.target.value
})
}
className="w-full rounded-lg border p-3"
>

<option>Confermata</option>
<option>In attesa</option>
<option>Cancellata</option>

</select>

</div>

</div>

</div>

{/* RIASSUNTO */}

<div className="rounded-xl border bg-green-50 p-5">

<h4 className="mb-3 font-semibold text-green-700">

Riepilogo soggiorno

</h4>

<div className="grid gap-4 md:grid-cols-4">

<div>

<div className="text-xs uppercase text-gray-500">

Notti

</div>

<div className="text-2xl font-bold">

{form.check_in && form.check_out
? Math.max(
1,
Math.ceil(
(new Date(form.check_out).getTime() -
new Date(form.check_in).getTime()) /
86400000
)
)
: "-"}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">

Persone

</div>

<div className="text-2xl font-bold">

{form.adults + form.children + form.infants}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">

Animali

</div>

<div className="text-2xl font-bold">

{form.animals}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">

Portale

</div>

<div className="text-xl font-semibold">

{form.source}

</div>

</div>

</div>

</div>

</div>

)}

       {activeTab === "payments" && (

<div className="space-y-8">

<div className="rounded-xl border bg-white p-4 md:p-6">

<h3 className="mb-6 text-xl font-semibold text-gray-800">

Pagamenti

</h3>

<div className="grid gap-5 md:grid-cols-2">

{/* Totale */}

<div>

<label className="mb-2 block font-medium">

Totale soggiorno (€)

</label>

<input
type="number"
step="0.01"
value={form.total}
onChange={(e)=>
setForm({
...form,
total:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* Caparra */}

<div>

<label className="mb-2 block font-medium">

Caparra (€)

</label>

<input
type="number"
step="0.01"
value={form.deposit}
onChange={(e)=>
setForm({
...form,
deposit:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* Incassato */}

<div>

<label className="mb-2 block font-medium">

Incassato (€)

</label>

<input
type="number"
step="0.01"
value={form.paid_amount}
onChange={(e)=>
setForm({
...form,
paid_amount:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* Tassa */}

<div>

<label className="mb-2 block font-medium">

Tassa di soggiorno (€)

</label>

<input
type="number"
step="0.01"
value={form.tourist_tax}
onChange={(e)=>
setForm({
...form,
tourist_tax:e.target.value
})
}
className="w-full rounded-lg border p-3"
/>

</div>

{/* Pagato */}

<div>

<label className="mb-2 block font-medium">

Pagamento

</label>

<select
value={form.paid ? "true":"false"}
onChange={(e)=>
setForm({
...form,
paid:e.target.value==="true"
})
}
className="w-full rounded-lg border p-3"
>

<option value="false">
Non saldato
</option>

<option value="true">
Saldo completo
</option>

</select>

</div>

{/* Tassa pagata */}

<div>

<label className="mb-2 block font-medium">

Tassa soggiorno

</label>

<select
value={form.tourist_tax_paid ? "true":"false"}
onChange={(e)=>
setForm({
...form,
tourist_tax_paid:e.target.value==="true"
})
}
className="w-full rounded-lg border p-3"
>

<option value="false">
Da riscuotere
</option>

<option value="true">
Incassata
</option>

</select>

</div>

</div>

</div>

{/* Riepilogo */}

<div className="rounded-xl border bg-gray-50 p-4 md:p-6">

<h4 className="mb-5 text-lg font-semibold">

Riepilogo economico

</h4>

<div className="grid gap-5 md:grid-cols-4">

<div>

<div className="text-xs uppercase text-gray-500">

Totale

</div>

<div className="text-xl md:text-3xl font-bold">

€ {Number(form.total || 0).toFixed(2)}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">

Incassato

</div>

<div className="text-xl md:text-3xl font-bold text-green-700">

€ {Number(form.paid_amount || 0).toFixed(2)}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">

Saldo

</div>

<div className={`text-xl md:text-3xl font-bold ${
Number(form.total)-Number(form.paid_amount)>0
? "text-red-600"
: "text-green-700"
}`}>

€ {(Number(form.total)-Number(form.paid_amount)).toFixed(2)}

</div>

</div>

<div>

<div className="text-xs uppercase text-gray-500">

Stato

</div>

<div className={`rounded-lg px-3 py-2 text-center font-semibold text-white ${
Number(form.total)<=0
? "bg-gray-400"
:Number(form.paid_amount)>=Number(form.total)
? "bg-green-600"
:Number(form.paid_amount)>0
? "bg-orange-500"
:"bg-red-600"
}`}>

{Number(form.total)<=0
? "-"
:Number(form.paid_amount)>=Number(form.total)
? "SALDATO"
:Number(form.paid_amount)>0
? "PARZIALE"
:"NON PAGATO"}

</div>

</div>

</div>

</div>

</div>

)}

        {activeTab === "documents" && (

<div className="space-y-8">

<div className="rounded-xl border bg-white p-4 md:p-6">

<h3 className="mb-6 text-xl font-semibold text-gray-800">

Checklist operativa

</h3>

<p className="mb-6 text-sm text-gray-500">

Completa tutte le attività prima del check-in.

</p>

<div className="space-y-4">

<label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

<div>

<div className="font-semibold">

📄 Documenti ricevuti

</div>

<div className="text-sm text-gray-500">

Carta d'identità o passaporto

</div>

</div>

<input
type="checkbox"
checked={form.documents_received}
onChange={(e)=>
setForm({
...form,
documents_received:e.target.checked
})
}
className="h-5 w-5"
/>

</label>

<label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

<div>

<div className="font-semibold">

🏛 AlloggiatiWeb inviato

</div>

<div className="text-sm text-gray-500">

Comunicazione alla Questura

</div>

</div>

<input
type="checkbox"
checked={form.alloggiati_sent}
onChange={(e)=>
setForm({
...form,
alloggiati_sent:e.target.checked
})
}
className="h-5 w-5"
/>

</label>

<label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

<div>

<div className="font-semibold">

📊 Motourist inviato

</div>

<div className="text-sm text-gray-500">

Comunicazione presenze

</div>

</div>

<input
type="checkbox"
checked={form.motourist_sent}
onChange={(e)=>
setForm({
...form,
motourist_sent:e.target.checked
})
}
className="h-5 w-5"
/>

</label>

<label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

<div>

<div className="font-semibold">

💶 Tassa di soggiorno riscossa

</div>

<div className="text-sm text-gray-500">

Conferma pagamento tassa

</div>

</div>

<input
type="checkbox"
checked={form.tourist_tax_paid}
onChange={(e)=>
setForm({
...form,
tourist_tax_paid:e.target.checked
})
}
className="h-5 w-5"
/>

</label>

</div>

</div>

<div className="rounded-xl border bg-green-50 p-4 md:p-6">

<h4 className="mb-5 text-lg font-semibold text-green-700">

Stato della pratica

</h4>

{(() => {

const completati = [
form.documents_received,
form.alloggiati_sent,
form.motourist_sent,
form.tourist_tax_paid,
].filter(Boolean).length;

const percentuale = completati * 25;

return (

<>

<div className="mb-4 h-4 overflow-hidden rounded-full bg-gray-200">

<div
style={{
width:`${percentuale}%`
}}
className="h-4 rounded-full bg-green-600 transition-all"
/>

</div>

<div className="flex justify-between text-sm">

<span>

Operazioni completate

</span>

<strong>

{completati}/4

</strong>

</div>

</>

);

})()}

</div>

<div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">

<h4 className="mb-3 font-semibold text-yellow-800">

Promemoria

</h4>

<ul className="space-y-2 text-sm text-yellow-900">

{!form.documents_received && (
<li>• Richiedere i documenti agli ospiti.</li>
)}

{!form.alloggiati_sent && (
<li>• Inviare la comunicazione su AlloggiatiWeb.</li>
)}

{!form.motourist_sent && (
<li>• Registrare la presenza su Motourist.</li>
)}

{!form.tourist_tax_paid && (
<li>• Riscuotere la tassa di soggiorno.</li>
)}

{form.documents_received &&
form.alloggiati_sent &&
form.motourist_sent &&
form.tourist_tax_paid && (

<li className="font-semibold text-green-700">

✅ Tutte le operazioni sono completate.

</li>

)}

</ul>

</div>

</div>

)}

      </div>

      {/* FOOTER */}

      <div
  className="
    sticky
    bottom-0
    border-t
    bg-white
    px-4
    py-3
    md:px-6
    md:py-4
  "
>

        <div className="text-sm text-gray-500">

          {booking
            ? `Prenotazione #${booking.id}`
            : "Nuova prenotazione"}

        </div>

        <div className="flex flex-col gap-2 md:flex-row">
{booking && (

<button
type="button"
onClick={eliminaPrenotazione}
className="
w-full
rounded-xl
bg-green-600
py-3
font-semibold
text-white
hover:bg-green-700
disabled:opacity-50
md:w-auto
md:px-6
"
>

🗑 Elimina

</button>

)}
          <button
            onClick={onClose}
            className="
w-full
rounded-xl
bg-green-600
py-3
font-semibold
text-white
hover:bg-green-700
disabled:opacity-50
md:w-auto
md:px-6
"
          >
            Annulla
          </button>

          <button
  onClick={salvaPrenotazione}
  disabled={loading}
  className="
w-full
rounded-xl
bg-green-600
py-3
font-semibold
text-white
hover:bg-green-700
disabled:opacity-50
md:w-auto
md:px-6
"
>
  {loading
    ? "Salvataggio..."
    : "💾 Salva Prenotazione"}
</button>

        </div>

      </div>

    </div>

  </div>

);
}