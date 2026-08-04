import type { GuestForm } from "../booking-modal/types";

type Props = {
  guest: GuestForm;
};

export default function ProformaGuest({ guest }: Props) {
  return (
    <section className="mt-8">

      <h3 className="section-title">
        Cliente
      </h3>

      <div className="section-box">

        <div className="grid grid-cols-[180px_1fr]">

          <div className="border-b bg-gray-50 px-5 py-3 font-medium">
            Nome
          </div>

          <div className="border-b px-5 py-3">
            {guest.nome} {guest.cognome}
          </div>

          <div className="border-b bg-gray-50 px-5 py-3 font-medium">
            Email
          </div>

          <div className="border-b px-5 py-3">
            {guest.email || "-"}
          </div>

          <div className="border-b bg-gray-50 px-5 py-3 font-medium">
            Telefono
          </div>

          <div className="border-b px-5 py-3">
            {guest.telefono || "-"}
          </div>

          <div className="bg-gray-50 px-5 py-3 font-medium">
            Nazionalità
          </div>

          <div className="px-5 py-3">
            {guest.nazionalita || "-"}
          </div>

        </div>

      </div>

    </section>
  );
}