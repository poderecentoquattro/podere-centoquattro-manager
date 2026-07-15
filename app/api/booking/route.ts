import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      apartments (
        id,
        name
      ),
      guests!bookings_guest_id_fkey (
  id,
  nome,
  cognome
)
    `);

  return NextResponse.json({ data, error });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("bookings")
    .insert([
{
apartment_id: body.apartment_id,

guest_id: body.guest_id,

check_in: body.check_in,
check_out: body.check_out,

adults: body.adults,
children: body.children,
infants: body.infants,

animals: body.animals,

source: body.source,

booking_code: body.booking_code,

status: body.status,

total:
body.total===""
?null
:Number(body.total),

deposit:
body.deposit===""
?0
:Number(body.deposit),

paid_amount:
body.paid_amount===""
?0
:Number(body.paid_amount),

tourist_tax:
body.tourist_tax===""
?0
:Number(body.tourist_tax),

paid: body.paid,

tourist_tax_paid:
body.tourist_tax_paid,

documents_received:
body.documents_received,

alloggiati_sent:
body.alloggiati_sent,

motourist_sent:
body.motourist_sent,

notes: body.notes

}
])

  if (error) {
    console.log(error);

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
export async function PUT(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("bookings")
    .update({

apartment_id: body.apartment_id,

guest_id: body.guest_id,

check_in: body.check_in,
check_out: body.check_out,

adults: body.adults,
children: body.children,
infants: body.infants,

animals: body.animals,

source: body.source,

booking_code: body.booking_code,

status: body.status,

total:
body.total===""
?null
:Number(body.total),

deposit:
body.deposit===""
?0
:Number(body.deposit),

paid_amount:
body.paid_amount===""
?0
:Number(body.paid_amount),

tourist_tax:
body.tourist_tax===""
?0
:Number(body.tourist_tax),

paid: body.paid,

tourist_tax_paid:
body.tourist_tax_paid,

documents_received:
body.documents_received,

alloggiati_sent:
body.alloggiati_sent,

motourist_sent:
body.motourist_sent,

notes: body.notes

})
.eq("id", body.id);

if (error) {
  console.log(error);

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
export async function DELETE(request: Request) {

const body=await request.json();

const {error}=await supabase
.from("bookings")
.delete()
.eq("id",body.id);

if(error){

return NextResponse.json(
{
success:false,
error
},
{status:500}
);

}

return NextResponse.json({
success:true
});
}