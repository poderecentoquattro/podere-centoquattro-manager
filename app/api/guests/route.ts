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
        data_nascita: body.data_nascita || null,
        luogo_nascita: body.luogo_nascita,
        lingua: body.lingua,
        notes: body.notes,
      },
    ])
    .select()
    .single();

    if (!error && body.componenti_viaggio?.length) {
  const { error: compError } = await supabase
    .from("componenti_viaggio")
    .insert(
      body.componenti_viaggio.map((c: any) => ({
        cliente_id: data.id,
        nome: c.nome,
        cognome: c.cognome,
        relazione: c.relazione,
        data_nascita: c.data_nascita || null,
      }))
    );

  if (compError) {
    console.error(compError);
  }
}

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
  data_nascita: body.data_nascita || null,
  luogo_nascita: body.luogo_nascita,
  lingua: body.lingua,
  notes: body.notes,
  tipo_viaggio: body.tipo_viaggio,
})
    .eq("id", body.id);

    // Elimina i vecchi componenti
await supabase
  .from("componenti_viaggio")
  .delete()
  .eq("cliente_id", body.id);

// Inserisce quelli nuovi
if (body.componenti_viaggio?.length) {
  const { error: compError } = await supabase
    .from("componenti_viaggio")
    .insert(
      body.componenti_viaggio.map((c: any) => ({
        cliente_id: body.id,
        nome: c.nome,
        cognome: c.cognome,
        relazione: c.relazione,
        data_nascita: c.data_nascita || null,
      }))
    );

  if (compError) {
    console.error(compError);
  }
}

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