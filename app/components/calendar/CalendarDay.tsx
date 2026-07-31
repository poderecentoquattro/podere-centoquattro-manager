type Props = {
  day: string;
  morning: any;
  afternoon: any;
};

function getName(slot: any) {
  if (!slot) return "";

  return `${slot.guests?.nome ?? ""} ${slot.guests?.cognome ?? ""}`;
}

export default function CalendarDay({
  day,
  morning,
  afternoon,
}: Props) {
  return (
    <div className="h-full flex flex-col">

      <div className="text-right pr-1 pt-1 font-bold text-xs">
        {day}
      </div>

      <div className="flex-1 flex flex-col">

        <div
          className="flex-1 border-b flex items-center justify-center text-[10px] font-semibold"
          style={{
            background: morning?.color ?? "#ffffff",
          }}
        >
          {getName(morning)}
        </div>

        <div
          className="flex-1 flex items-center justify-center text-[10px] font-semibold"
          style={{
            background: afternoon?.color ?? "#ffffff",
          }}
        >
          {getName(afternoon)}
        </div>

      </div>

    </div>
  );
}