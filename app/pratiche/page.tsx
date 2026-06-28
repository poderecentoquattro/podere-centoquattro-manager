export default function Pratiche() {
  return (
    <main className="min-h-screen bg-green-50 p-10">

      <h1 className="text-4xl font-bold text-green-800">
        📋 Tutte le Pratiche
      </h1>

      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Ospite</th>
              <th className="text-left p-3">Appartamento</th>
              <th className="text-left p-3">Check-in</th>
              <th className="text-left p-3">Check-out</th>
            </tr>
          </thead>

          <tbody>

          </tbody>

        </table>

      </div>

    </main>
  );
}