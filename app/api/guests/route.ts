import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("cognome", { ascending: true });

  return NextResponse.json({ data, error });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("guests")
    .insert([
      {
        nome: body.nome,
        cognome: body.cognome,
        data_nascita: body.data_nascita,
        nazionalita: body.nazionalita,
        telefono: body.telefono,
        email: body.email,
        note: body.note,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("guests")
    .update({
      nome: body.nome,
      cognome: body.cognome,
      data_nascita: body.data_nascita,
      nazionalita: body.nazionalita,
      telefono: body.telefono,
      email: body.email,
      note: body.note,
    })
    .eq("id", body.id);

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}