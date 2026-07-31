type Props = {
  day: Date;
  morning?: any;
  afternoon?: any;
};

function getName(booking: any) {
  if (!booking) return "";

  return `${booking.guests?.nome ?? ""} ${booking.guests?.cognome ?? ""}`;
}

export default function CalendarCell({
  day,
  morning,
  afternoon,
}: Props) {
  return (
    <div className="border h-36 p-2">

      <div className="font-bold text-sm mb-2">
        {day.getDate()}
      </div>

      <div className="border-t pt-1 text-xs min-h-10">
        <div className="text-gray-400">
          Mattina
        </div>

        {morning && (
          <div className="font-medium">
            {getName(morning)}
          </div>
        )}
      </div>

      <div className="border-t pt-1 text-xs min-h-10 mt-2">
        <div className="text-gray-400">
          Pomeriggio
        </div>

        {afternoon && (
          <div className="font-medium">
            {getName(afternoon)}
          </div>
        )}
      </div>

    </div>
  );
}