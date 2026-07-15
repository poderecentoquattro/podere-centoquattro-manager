"use client";

import { useEffect, useState } from "react";

import BookingGuest from "./BookingGuest";
import BookingStay from "./BookingStay";
import BookingPayment from "./BookingPayment";

import type { Guest } from "@/app/types/guest";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedDate: string;
  booking?: any;
  onSaved?: () => void;
};

type FormData = {
  id?: number;

  apartment_id: number;

  guest: Guest | null;

  check_in: string;
  check_out: string;

  adults: number;
  children: number;
  animals: number;

  total: number;
  deposit: number;
  paid_amount: number;

  tourist_tax: number;

  paid: boolean;

  source: string;

  notes: string;
};

export default function BookingModalV2({
  open,
  onClose,
  selectedDate,
  booking,
  onSaved,
}: Props) {
  const [form, setForm] = useState<FormData>({
    apartment_id: 1,

    guest: null,

    check_in: selectedDate,
    check_out: "",

    adults: 2,
    children: 0,
    animals: 0,

    total: 0,
    deposit: 0,
    paid_amount: 0,

    tourist_tax: 0,

    paid: false,

    source: "Diretto",

    notes: "",
  });

  useEffect(() => {
    if (!booking) {
      setForm({
        apartment_id: 1,

        guest: null,

        check_in: selectedDate,
        check_out: "",

        adults: 2,
        children: 0,
        animals: 0,

        total: 0,
        deposit: 0,
        paid_amount: 0,

        tourist_tax: 0,

        paid: false,

        source: "Diretto",

        notes: "",
      });

      return;
    }

    setForm({
      id: booking.id,

      apartment_id: booking.apartment_id,

      guest: booking.guests ?? null,

      check_in: booking.check_in,

      check_out: booking.check_out,

      adults: booking.adults,

      children: booking.children,

      animals: booking.animals ?? 0,

      total: Number(booking.total ?? 0),

      deposit: Number(booking.deposit ?? 0),

      paid_amount: Number(booking.paid_amount ?? 0),

      tourist_tax: Number(
        booking.tourist_tax ?? 0
      ),

      paid: booking.paid,

      source: booking.source ?? "Diretto",

      notes: booking.notes ?? "",
    });
  }, [booking, selectedDate]);

  if (!open) return null;

   async function salvaPrenotazione() {
    const metodo = booking ? "PUT" : "POST";

    const body = {
      id: form.id,

      apartment_id: form.apartment_id,

      guest_id: form.guest?.id ?? null,

      check_in: form.check_in,
      check_out: form.check_out,

      adults: form.adults,
      children: form.children,
      animals: form.animals,

      total: form.total,
      deposit: form.deposit,
      paid_amount: form.paid_amount,

      tourist_tax: form.tourist_tax,

      paid: form.paid,

      source: form.source,

      notes: form.notes,
    };

    const res = await fetch("/api/booking", {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();

      alert(JSON.stringify(err));

      return;
    }

    onSaved?.();

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">

        <h1 className="mb-8 text-4xl font-bold text-[#0A5A34]">
          {booking
            ? "Modifica Prenotazione"
            : "Nuova Prenotazione"}
        </h1>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold">
              Appartamento
            </label>

            <select
              value={form.apartment_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  apartment_id: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option value={1}>Blu</option>
              <option value={2}>Verde</option>
              <option value={3}>Bianco</option>
            </select>

          </div>

          <BookingGuest
            guest={form.guest}
            onChange={(guest) =>
              setForm({
                ...form,
                guest,
              })
            }
          />

          <BookingStay
            checkIn={form.check_in}
            checkOut={form.check_out}
            adults={form.adults}
            children={form.children}
            animals={form.animals}
            onChange={(field, value) =>
              setForm({
                ...form,
                [field]: value,
              })
            }
          />

          <BookingPayment
            total={form.total}
            paidAmount={form.paid_amount}
            touristTax={form.tourist_tax}
            onChange={(field, value) =>
              setForm({
                ...form,
                [field]: value,
              })
            }
          />

          <div>

            <label className="mb-2 block font-semibold">
              Provenienza
            </label>

            <select
              value={form.source}
              onChange={(e) =>
                setForm({
                  ...form,
                  source: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option>Diretto</option>
              <option>Booking</option>
              <option>Airbnb</option>
              <option>Vrbo</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Note
            </label>

            <textarea
              rows={5}
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100"
            >
              Annulla
            </button>

            <button
              type="button"
              onClick={salvaPrenotazione}
              className="rounded-xl bg-[#0A5A34] px-6 py-3 font-semibold text-white hover:bg-[#084728]"
            >
              💾 Salva
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}