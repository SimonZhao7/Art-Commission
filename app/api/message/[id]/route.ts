import { NextResponse } from "next/server";
// Firebase
import { db } from "@/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
// Pusher
import Pusher from "pusher";
import { User } from "@/types/user";

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "us3",
  useTLS: true,
});

export async function POST(request: Request) {
  const BODY_FIELDS = ["chatId", "senderId", "message"];
  const body = await request.json();

  BODY_FIELDS.forEach((key) => {
    if (!(key in body)) {
      return NextResponse.json(
        { message: `No ${key} provided` },
        { status: 400 },
      );
    }
  });

  const { chatId, senderId, message } = body;

  const sender = await getDoc(doc(db, "users", senderId));

  const newDoc = await addDoc(collection(db, "messages"), {
    chatId: chatId,
    message,
    messageType: "TEXT",
    senderId,
    timestamp: serverTimestamp(),
  });

  await pusher.trigger(`messages-${chatId}`, "newMessage", {
    id: newDoc.id,
    chatId: chatId,
    message,
    messageType: "TEXT",
    sender: { id: sender.id, ...sender.data() } as User,
    timestamp: new Date(),
  });
  return NextResponse.json({}, { status: 200 });
}
