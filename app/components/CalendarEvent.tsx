import "./CalendarEvent.css";

type Props = {
  title: string;
  color: string;
  isStart: boolean;
  isEnd: boolean;
};

export default function CalendarEvent({
  title,
  color,
  isStart,
  isEnd,
}: Props) {
  let className = "booking-bar";

  if (isStart) className += " booking-start";
  if (isEnd) className += " booking-end";

 return (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: "100%",
      width: "100%",
      color: "white",
      fontSize: "12px",
      fontWeight: 500,
    }}
  >
    {isStart && !isEnd && (
      <div
        style={{
          width: "50%",
          height: "100%",
          background: color,
          borderRadius: "8px 0 0 8px",
          display: "flex",
          alignItems: "center",
          paddingLeft: 6,
        }}
      >
        {title}
      </div>
    )}

    {!isStart && !isEnd && (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: color,
          display: "flex",
          alignItems: "center",
          paddingLeft: 6,
        }}
      >
        {title}
      </div>
    )}

    {!isStart && isEnd && (
      <div
        style={{
          width: "50%",
          marginLeft: "50%",
          height: "100%",
          background: color,
          borderRadius: "0 8px 8px 0",
          display: "flex",
          alignItems: "center",
          paddingLeft: 6,
        }}
      >
        {title}
      </div>
    )}

    {isStart && isEnd && (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: color,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          paddingLeft: 6,
        }}
      >
        {title}
      </div>
    )}
  </div>
);
}