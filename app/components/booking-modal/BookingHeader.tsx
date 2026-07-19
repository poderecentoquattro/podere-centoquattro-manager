type BookingHeaderProps = {
  booking?: any;
  onClose: () => void;
};

export default function BookingHeader({
  booking,
  onClose,
}: BookingHeaderProps) {
  return (
    <div className="border-b bg-gradient-to-r from-green-700 to-green-600 px-4 py-3 text-white md:px-6 md:py-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold md:text-3xl">
            {booking ? "Modifica Prenotazione" : "Nuova Prenotazione"}
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
  );
}