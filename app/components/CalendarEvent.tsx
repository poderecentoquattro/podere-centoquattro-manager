import "./CalendarEvent.css";

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
  const guest = booking?.guest ?? "";
  const source = booking?.source ?? "";
  const checkIn = booking?.check_in;
  const checkOut = booking?.check_out;

  const today = currentDate.substring(0, 10);

  const isCheckIn = today === checkIn;
  const isCheckOut = today === checkOut;

  return (
  <div
    style={{
      background: "red",
      color: "white",
      padding: 4,
      borderRadius: 6,
      fontWeight: "bold",
    }}
  >
    TEST
  </div>
);

      {isCheckIn ? (
        <>
          <div style={{ width: "50%", background: "transparent" }} />
          <div
            style={{
              width: "50%",
              background: color,
              display: "flex",
              alignItems: "center",
              paddingLeft: 6,
            }}
          >
            {guest}
          </div>
        </>
      ) : isCheckOut ? (
        <>
          <div
            style={{
              width: "50%",
              background: color,
              display: "flex",
              alignItems: "center",
              paddingLeft: 6,
            }}
          >
            {guest}
          </div>
          <div style={{ width: "50%", background: "transparent" }} />
        </>
      ) : (
        <div
          style={{
            width: "100%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px",
          }}
        >
          <span>{guest}</span>
          <span style={{ fontSize: 10 }}>{source}</span>
        </div>
      )}
  
}