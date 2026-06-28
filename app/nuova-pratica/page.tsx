export default function NuovaPratica() {
  return (
    <main className="min-h-screen bg-green-50 p-10">
      <h1 className="text-4xl font-bold text-green-800 mb-8">
        🏡 Nuova Pratica
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Nome e Cognome
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Telefono
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg p-3"
          />
        </div>

<div className="mb-4">
  <label className="block font-semibold mb-1">
    Appartamento
  </label>

  <select className="w-full border rounded-lg p-3">
    <option>Appartamento Blu</option>
    <option>Appartamento Verde</option>
    <option>Appartamento Bianco</option>
  </select>
</div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block font-semibold mb-1">
              Check-in
            </label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Check-out
            </label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <button className="mt-8 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800">
          💾 Salva Pratica
        </button>

      </div>
    </main>
  );
}