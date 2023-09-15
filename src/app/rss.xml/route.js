import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
  const data = await res.json();

  return NextResponse.json({ data });
}
