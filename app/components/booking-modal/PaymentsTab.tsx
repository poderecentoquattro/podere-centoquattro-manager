import { useEffect, useState } from "react";
import type { BookingForm } from "./types";
import { supabase } from "@/lib/supabase";

type PaymentsTabProps = {
  bookingId?: number;
  form: BookingForm;
  setForm: React.Dispatch<React.SetStateAction<BookingForm>>;
};

export default function PaymentsTab({
  bookingId,
  form,
  setForm,
}: PaymentsTabProps) {

  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
  if (!bookingId) return;

  loadPayments();
}, [bookingId]);

async function loadPayments() {
  const response = await fetch(
    `/api/payments?booking_id=${bookingId}`
  );

  if (!response.ok) return;

  const data = await response.json();

  setPayments(data);
}

 const total = Number(form.total || 0);
const deposit = Number(form.deposit || 0);
const balance = Number(form.balance || 0);
const touristTax = Number(form.tourist_tax || 0);

const paid = deposit + balance;
const remaining = Math.max(0, total - paid);

const paymentStatus =
  remaining === 0
    ? "paid"
    : paid > 0
    ? "partial"
    : "unpaid";

    async function handleRegisterPayment() {
  if (!bookingId) {
    alert("Salva prima la prenotazione.");
    return;
  }

  const amount =
    Number(form.balance || 0) > 0
      ? Number(form.balance)
      : Number(form.deposit);

  const type =
    Number(form.balance || 0) > 0
      ? "Saldo"
      : "Acconto";

  const method =
    Number(form.balance || 0) > 0
      ? form.balance_payment_method
      : form.deposit_payment_method;

  const response = await fetch("/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      booking_id: bookingId,
      type,
      amount,
      method,
    }),
  });

  if (!response.ok) {
    alert("Errore durante il salvataggio del pagamento.");
    return;
  }

  await loadPayments();

alert("Pagamento registrato con successo!");
}
async function handleDeletePayment(id: number) {
  const confirmDelete = window.confirm(
    "Sei sicuro di voler eliminare questo pagamento?"
  );

  if (!confirmDelete) return;

  const response = await fetch(`/api/payments?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Errore durante l'eliminazione.");
    return;
  }

  await loadPayments();
}
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">
        Pagamenti
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Totale soggiorno (€)
          </label>

          <input
            type="number"
            value={form.total}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                total: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Acconto (€)
          </label>

          <input
            type="number"
            value={form.deposit}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                deposit: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

<div>
  <label className="mb-2 block font-medium">
    Saldo ricevuto (€)
  </label>

  <input
    type="number"
    value={form.balance ?? ""}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        balance: e.target.value,
      }))
    }
    className="w-full rounded-lg border p-3"
  />
</div>

        <div>
          <label className="mb-2 block font-medium">
            Tassa di soggiorno (€)
          </label>

          <input
            type="number"
            value={form.tourist_tax}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                tourist_tax: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

      </div>

      <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Riepilogo pagamento
        </h3>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Totale soggiorno</span>
            <span>€ {Number(form.total || 0).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
  <span>Acconto</span>
  <span>€ {Number(form.deposit || 0).toFixed(2)}</span>
</div>

<div className="flex justify-between">
  <span>Saldo</span>
  <span>€ {balance.toFixed(2)}</span>
</div>

<div>
  <label className="mb-2 block font-medium">
    Metodo pagamento acconto
  </label>

  <div className="flex justify-between font-semibold">
  <span>Pagato</span>
  <span>€ {paid.toFixed(2)}</span>
</div>

  <select
    className="w-full rounded-lg border p-3"
    value={form.deposit_payment_method || ""}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        deposit_payment_method: e.target.value,
      }))
    }
  >
    <option value="">Seleziona...</option>
    <option value="Bonifico">Bonifico</option>
    <option value="Carta">Carta</option>
    <option value="Contanti">Contanti</option>
    <option value="Booking">Booking</option>
    <option value="Airbnb">Airbnb</option>
  </select>
</div>

<div>
  <label className="mb-2 block font-medium">
    Metodo pagamento saldo
  </label>

  <select
    className="w-full rounded-lg border p-3"
    value={form.balance_payment_method || ""}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        balance_payment_method: e.target.value,
      }))
    }
  >
    <option value="">Seleziona...</option>
    <option value="Bonifico">Bonifico</option>
    <option value="Carta">Carta</option>
    <option value="Contanti">Contanti</option>
    <option value="Booking">Booking</option>
    <option value="Airbnb">Airbnb</option>
  </select>
</div>

          <div className="flex justify-between">
            <span>Tassa di soggiorno</span>
            <span>€ {Number(form.tourist_tax || 0).toFixed(2)}</span>
          </div>

<div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
  <label className="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={form.tourist_tax_paid}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          tourist_tax_paid: e.target.checked,
        }))
      }
      className="h-5 w-5"
    />

    <span className="font-medium">
      🏛 Tassa di soggiorno riscossa
    </span>
  </label>
</div>

          <div
  className={`mt-3 border-t pt-3 flex justify-between text-lg font-bold ${
    paymentStatus === "paid"
      ? "text-green-600"
      : paymentStatus === "partial"
      ? "text-amber-600"
      : "text-red-600"
  }`}
>
  <span>
    {paymentStatus === "paid"
      ? "✅ Saldato"
      : paymentStatus === "partial"
      ? "🟡 Da incassare"
      : "🔴 Da incassare"}
  </span>

  <span>€ {remaining.toFixed(2)}</span>
</div>

        </div>
      </div>

<div className="mt-6 flex justify-end">
  <button
  onClick={handleRegisterPayment}
  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
>
    ➕ Registra pagamento
  </button>
</div>

<div className="mt-8 rounded-xl border">
  <div className="border-b bg-gray-50 px-4 py-3">
   <h3 className="font-semibold">
  Storico pagamenti
</h3>
</div>

{payments.length === 0 ? (
  <div className="p-6 text-center text-gray-500">
    Nessun pagamento registrato
  </div>
) : (
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Data</th>
          <th className="px-4 py-2 text-left">Tipo</th>
          <th className="px-4 py-2 text-right">Importo</th>
          <th className="px-4 py-2 text-left">Metodo</th>
          <th className="w-12"></th>
        </tr>
      </thead>

      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id} className="border-t">
            <td className="px-4 py-2">
              {new Date(payment.payment_date).toLocaleDateString("it-IT")}
            </td>

            <td className="px-4 py-2">
              {payment.type}
            </td>

            <td className="px-4 py-2 text-right">
              € {Number(payment.amount).toFixed(2)}
            </td>

            <td className="px-4 py-2">
              {payment.method}
            </td>
            <td className="px-4 py-2 text-center">
  <button
    onClick={() => handleDeletePayment(payment.id)}
    className="text-red-600 hover:text-red-800"
    title="Elimina pagamento"
  >
    🗑️
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
</div>

    </div>
  );
}