import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("payments")
    .insert([
      {
        booking_id: body.booking_id,
        payment_date: new Date(),
        type: body.type,
        amount: Number(body.amount),
        method: body.method,
        notes: body.notes ?? "",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const bookingId = searchParams.get("booking_id");

  if (!bookingId) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("booking_id", bookingId)
    .order("payment_date", { ascending: false });

  if (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID mancante" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("payments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}