"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type BookingContextType = {
  booking: any;
  open: boolean;
  openBooking: (booking: any) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<
  BookingContextType | undefined
>(undefined);

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [booking, setBooking] = useState<any>(null);
  const [open, setOpen] = useState(false);

  function openBooking(booking: any) {
    setBooking(booking);
    setOpen(true);
  }

  function closeBooking() {
    setBooking(null);
    setOpen(false);
  }

  return (
    <BookingContext.Provider
      value={{
        booking,
        open,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking deve essere usato dentro BookingProvider"
    );
  }

  return context;
}