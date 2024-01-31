import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server"

export async function GET(
  req: Request
) {
  try {
    console.log("HOLA FORM GET")
    return NextResponse.json({ "data": "here is your string data"});
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request
) {
  try {
    const session = await auth();

    // This should not happen because our middleware, just in case and for typing
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { roomName } = await req.json();

    const roomCreated = await db.room.create({
      data: {
        name: roomName,
        userId: session.user.id,
      }
    })

    return NextResponse.json({
      room: roomCreated
    });
  } catch (error) {
    console.log("ROOM_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}