"use client";

import { useEffect, useState } from "react";

type Booking = {
  id?: number;
  apartment_id: number;
  guest: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  total: string;
  deposit: string;
paid_amount: string;
  paid: boolean;
  source: string;
  notes: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  selectedDate: string;
  booking?: any;
  onSaved?: () => void;
};

 export default function BookingModal({
  open,
  onClose,
  selectedDate,
  booking,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Booking>({
  id: booking?.id,
    apartment_id: booking?.apartment_id ?? 1,
  guest: booking?.guest ?? "",
  check_in: booking?.check_in ?? selectedDate,
  check_out: booking?.check_out ?? "",
  adults: booking?.adults ?? 2,
  children: booking?.children ?? 0,
  total: booking?.total?.toString() ?? "",
  deposit: booking?.deposit?.toString() ?? "0",
paid_amount: booking?.paid_amount?.toString() ?? "0",
  paid: booking?.paid ?? false,
  source: booking?.source ?? "Diretto",
  notes: booking?.notes ?? "",
});

 useEffect(() => {
 if (booking) {
  setForm({
    id: booking.id,
    apartment_id: booking.apartment_id,
    guest: booking.guest ?? "",
    check_in: booking.check_in ?? "",
    check_out: booking.check_out ?? "",
    adults: booking.adults,
    children: booking.children,
    total: booking.total?.toString() ?? "",

    deposit: booking.deposit?.toString() ?? "0",
    paid_amount: booking.paid_amount?.toString() ?? "0",

    paid: booking.paid,
    source: booking.source ?? "Diretto",
    notes: booking.notes ?? "",
  });
  } else {
    setForm({
      apartment_id: 1,
      guest: "",
      check_in: selectedDate,
      check_out: "",
      adults: 2,
      children: 0,
      total: "",
      deposit: "0",
paid_amount: "0",
      paid: false,
      source: "Diretto",
      notes: "",
      
    });
  }
}, [booking, selectedDate]);
  if (!open) return null;

  async function salvaPrenotazione() {
    const metodo = booking ? "PUT" : "POST";

    const res = await fetch("/api/booking", {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert(
        booking
          ? "Prenotazione aggiornata!"
          : "Prenotazione salvata!"
      );

      onSaved?.();
      onClose();
      location.reload();
    } else {
      const err = await res.json();
      console.log(err);
      alert("Errore durante il salvataggio.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto p-8">

        <h2 className="text-3xl font-bold text-green-700 mb-8">
  {booking ? "Modifica Prenotazione" : "Nuova Prenotazione"}
</h2>

        <div className="grid grid-cols-2 gap-5">

          <div className="col-span-2">
            <label className="font-medium">Appartamento</label>

            <select
              value={form.apartment_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  apartment_id: Number(e.target.value),
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value={1}>Blu</option>
              <option value={2}>Verde</option>
              <option value={3}>Bianco</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Cliente</label>

            <input
              value={form.guest}
              onChange={(e) =>
                setForm({
                  ...form,
                  guest: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Nome e Cognome"
            />
          </div>

<div>
  <label className="font-medium">Provenienza</label>

  <select
    value={form.source}
    onChange={(e) =>
      setForm({
        ...form,
        source: e.target.value,
      })
    }
    className="w-full border rounded-lg p-2 mt-1"
  >
    <option value="Diretto">Diretto</option>
    <option value="Booking">Booking</option>
    <option value="Airbnb">Airbnb</option>
    <option value="Vrbo">Vrbo</option>
    <option value="Altro">Altro</option>
  </select>
</div>

          <div>
            <label className="font-medium">Check-in</label>

            <input
              type="date"
              value={form.check_in}
              onChange={(e) =>
                setForm({
                  ...form,
                  check_in: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Check-out</label>

            <input
              type="date"
              value={form.check_out}
              onChange={(e) =>
                setForm({
                  ...form,
                  check_out: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Adulti</label>

            <input
              type="number"
              value={form.adults}
              onChange={(e) =>
                setForm({
                  ...form,
                  adults: Number(e.target.value),
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Bambini</label>

            <input
              type="number"
              value={form.children}
              onChange={(e) =>
                setForm({
                  ...form,
                  children: Number(e.target.value),
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            
           <label className="font-medium">Totale €</label>

<input
  value={form.total}
  onChange={(e) =>
    setForm({
      ...form,
      total: e.target.value,
    })
  }
  className="w-full border rounded-lg p-2 mt-1"
/> 
            <div>
  <label className="font-medium">Caparra €</label>

  <input
    value={form.deposit}
    onChange={(e) =>
      setForm({
        ...form,
        deposit: e.target.value,
      })
    }
    className="w-full border rounded-lg p-2 mt-1"
  />
</div>

<div>
  <label className="font-medium">Incassato €</label>

  <input
    value={form.paid_amount}
    onChange={(e) =>
      setForm({
        ...form,
        paid_amount: e.target.value,
      })
    }
    className="w-full border rounded-lg p-2 mt-1"
  />
</div>

            <input
              value={form.total}
              onChange={(e) =>
                setForm({
                  ...form,
                  total: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Pagato</label>

            <select
              value={form.paid ? "true" : "false"}
              onChange={(e) =>
                setForm({
                  ...form,
                  paid: e.target.value === "true",
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value="false">No</option>
              <option value="true">Sì</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Note</label>

            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 mt-1"
              rows={4}
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Annulla
          </button>

          <button
            onClick={salvaPrenotazione}
            className="px-5 py-2 rounded-lg bg-green-600 text-white"
          >
            💾 Salva
          </button>

        </div>

      </div>
    </div>
  );
}