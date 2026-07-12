type Props = {
  guest: any;
};

export default function GuestCard({ guest }: Props) {
  return (
    <div className="cursor-pointer rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

      <h2 className="text-xl font-bold">
        {guest.nome} {guest.cognome}
      </h2>

      <div className="mt-3 space-y-2 text-gray-600">

        {guest.nazionalita && (
          <p>🌍 {guest.nazionalita}</p>
        )}

        {guest.telefono && (
          <p>📞 {guest.telefono}</p>
        )}

        {guest.email && (
          <p>✉️ {guest.email}</p>
        )}

      </div>

    </div>
  );
}