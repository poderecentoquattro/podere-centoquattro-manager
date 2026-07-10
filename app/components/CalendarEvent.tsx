import { useEffect, useState } from "react";

type Props = {
  booking: any;
  color: string;
  currentDate: string;
};

export default function CalendarEvent({
  booking,
  color,
  currentDate,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const guest = booking?.guest ?? "";
  const source = booking?.source ?? "";

  const checkIn = booking?.check_in;
  const checkOut = booking?.check_out;

  const isCheckIn = currentDate === checkIn;
  const isCheckOut = currentDate === checkOut;

  const sourceIcon =
    source === "Booking"
      ? "🟦"
      : source === "Airbnb"
      ? "🟥"
      : "🟢";

  const eventHeight = isMobile ? 24 : 32;
  const fontSize = isMobile ? 12 : 14;
  const borderRadius = isMobile ? 8 : 12;
  const padding = isMobile ? "0 6px" : "0 10px";

  const guestName = isMobile
    ? guest.split(" ")[0]
    : guest;

  const style: React.CSSProperties = {
    height: eventHeight,
    display: "flex",
    alignItems: "center",
    color: "white",
    fontWeight: 600,
    fontSize,
    overflow: "hidden",
  };

  const eventBox: React.CSSProperties = {
    background: color,
    borderRadius,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding,
    boxSizing: "border-box",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

  if (isCheckIn && !isCheckOut) {
    return (
      <div style={style}>
        <div style={{ width: "50%" }} />

        <div style={{ ...eventBox, width: "50%" }}>
          <span
  style={{
    color: "#fff",
    fontWeight: 700,
    textShadow: "0 1px 2px rgba(0,0,0,.35)",
  }}
>
  {guestName}
</span>
          {!isMobile && <span>{sourceIcon}</span>}
        </div>
      </div>
    );
  }

  if (isCheckOut && !isCheckIn) {
    return (
      <div style={style}>
        <div style={{ ...eventBox, width: "50%" }}>
          <span
  style={{
    color: "#fff",
    fontWeight: 700,
    textShadow: "0 1px 2px rgba(0,0,0,.35)",
  }}
>
  {guestName}
</span>
          {!isMobile && <span>{sourceIcon}</span>}
        </div>

        <div style={{ width: "50%" }} />
      </div>
    );
  }

  return (
  <div style={eventBox}>
    <span
      style={{
        color: "#fff",
        fontWeight: 700,
        textShadow: "0 1px 2px rgba(0,0,0,.35)",
      }}
    >
      {guestName}
    </span>

    {!isMobile && (
      <span
        style={{
          color: "#fff",
          fontSize: 12,
        }}
      >
        {sourceIcon}
      </span>
    )}
  </div>
);
}