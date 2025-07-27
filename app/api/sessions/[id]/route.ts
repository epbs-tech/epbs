import { NextRequest, NextResponse } from 'next/server';
import {getSessionById, updateSession} from "@/lib/data";

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  try {
    const session = await getSessionById(id);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
{params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  try {
    const data = await request.json();

    const updatedSession = await updateSession(id, data);

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}