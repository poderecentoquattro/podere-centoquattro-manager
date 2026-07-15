import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// =========================
// GET
// Elenco ospiti
// =========================
export async function GET() {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("cognome", { ascending: true });

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

// =========================
// POST
// Nuovo ospite
// =========================
export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("guests")
    .insert([
      {
        nome: body.nome,
        cognome: body.cognome,
        email: body.email,
        telefono: body.telefono,
        nazionalita: body.nazionalita,
        data_nascita: body.data_nascita,
        luogo_nascita: body.luogo_nascita,
        lingua: body.lingua,
        notes: body.notes,
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

// =========================
// PUT
// Modifica ospite
// =========================
export async function PUT(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("guests")
    .update({
      nome: body.nome,
      cognome: body.cognome,
      email: body.email,
      telefono: body.telefono,
      nazionalita: body.nazionalita,
      data_nascita: body.data_nascita,
      luogo_nascita: body.luogo_nascita,
      lingua: body.lingua,
      notes: body.notes,
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

// =========================
// DELETE
// Elimina ospite
// =========================
export async function DELETE(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("guests")
    .delete()
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