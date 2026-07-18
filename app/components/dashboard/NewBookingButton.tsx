"use client";

import { useState } from "react";
import Button from "../Button";
import BookingModal from "../BookingModal";

export default function NewBookingButton() {
  const [open, setOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        ➕ Nuova Prenotazione
      </Button>

      <BookingModal
        open={open}
        booking={undefined}
        selectedDate={today}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          window.location.reload();
        }}
      />
    </>
  );
}