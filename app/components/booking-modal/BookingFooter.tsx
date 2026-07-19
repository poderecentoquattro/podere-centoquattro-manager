type BookingFooterProps = {
  booking?: any;
  loading: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
};

export default function BookingFooter({
  booking,
  loading,
  onClose,
  onSave,
  onDelete,
}: BookingFooterProps) {
  return (
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
            onClick={onDelete}
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
          onClick={onSave}
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
  );
}