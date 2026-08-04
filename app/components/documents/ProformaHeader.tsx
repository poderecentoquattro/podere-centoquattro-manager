type Props = {
  number?: string;
};

export default function ProformaHeader({
  number = "PF-2026-0001",
}: Props) {
  return (
    <header className="border-b pb-8">

      <div className="flex items-start justify-between">

        <div>

          {/* QUI POI METTEREMO IL LOGO */}

          <h1 className="text-3xl font-serif font-bold tracking-wide">
            Podere Centoquattro
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Rural Escape SRLS
          </p>

          <p className="text-sm text-gray-500">
            Via Aurelia Sud 104
          </p>

          <p className="text-sm text-gray-500">
            57023 Cecina (LI)
          </p>

        </div>

        <div className="text-right">

          <h2 className="text-4xl font-light tracking-[0.3em]">
            PROFORMA
          </h2>

          <div className="mt-6 space-y-1 text-sm">

            <div className="flex justify-end gap-3">

              <span className="text-gray-500">
                Numero
              </span>

              <strong>{number}</strong>

            </div>

            <div className="flex justify-end gap-3">

              <span className="text-gray-500">
                Data
              </span>

              <strong>
                {new Date().toLocaleDateString("it-IT")}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}