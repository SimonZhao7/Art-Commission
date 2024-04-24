"use client";
import { useState, useEffect, useRef, UIEventHandler } from "react";
// Firebase
import {
  query,
  collection,
  where,
  getDoc,
  getDocs,
  doc,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  Query,
} from "firebase/firestore";
import { db } from "@/firebase";
// Components
import ChatImage from "./ChatImage";
import MessageForm from "./MessageForm";
import AddImageForm from "./AddImageForm";
import Spinner from "@/components/Spinner";
// Pusher
import Pusher from "pusher-js/with-encryption";
// Hooks
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/hooks/useFirebaseUser";
// Icons
import { BiChevronDown } from "react-icons/bi";
// Types
import { User } from "@/types/user";
// Util
import "dotenv/config";

interface Props {
  params: {
    id: string;
  };
}

export interface Message {
  id: string;
  chatId: string;
  message: string;
  messageType: "TEXT" | "IMAGE";
  sender: User;
  timestamp: Date;
}

const LIMIT = 10;

export default function Chat({ params }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState<boolean>(false);
  const {
    modalOpen: imageModalOpen,
    openModal: openImageModal,
    closeModal: closeImageModal,
  } = useModal(false);
  const currentUser = useAuth();
  const chatDiv = useRef<HTMLDivElement | null>(null);
  const chatBottom = useRef<HTMLDivElement | null>(null);
  const offFromBottom = useRef(0);
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: "us3",
  });

  useEffect(() => {
    const fetchNewMsgs = async () => {
      const q = query(
        collection(db, "messages"),
        where("chatId", "==", params.id),
        orderBy("timestamp", "desc"),
        limit(LIMIT + 1),
      );
      await fetchQuery(q);
    };

    fetchNewMsgs();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && chatDiv.current) {
      const scrollHeight = chatDiv.current.scrollHeight;
      chatDiv.current.scroll(0, scrollHeight - offFromBottom.current);
    }

    const channel = pusher.subscribe(`messages-${params.id}`);
    channel.bind("newMessage", (message: Message) => {
      setMessages([...messages, message]);
    });
    return () => channel.unsubscribe();
  }, [messages]);

  const fetchNextPage = async () => {
    // Reduce call rate
    setTimeout(async () => {
      const q = query(
        collection(db, "messages"),
        where("chatId", "==", params.id),
        orderBy("timestamp", "desc"),
        limit(LIMIT + 1),
        startAfter(messages[0].timestamp),
      );
      await fetchQuery(q);
      setLoading(false);
    }, 500);
  };

  const handleScrollEvent: UIEventHandler<HTMLDivElement> = async (e) => {
    const div = e.currentTarget;
    if (div.scrollTop < div.scrollHeight - 800) {
      setShowScrollBottom(true);
    } else {
      setShowScrollBottom(false);
    }

    if (div.scrollTop <= 0 && !loading && hasNextPage) {
      offFromBottom.current = div.scrollHeight;
      if (messages.length > 0 && hasNextPage) {
        setLoading(true);
        await fetchNextPage();
      }
    }
  };

  const fetchQuery = async (q: Query<DocumentData>) => {
    const data = await getDocs(q);
    if (data.docs.length > 0) {
      const length = data.docs.length;
      const slicedDocs = data.docs.slice(0, Math.min(length, 10));
      const newMsgs = await fillSenderData(slicedDocs);
      newMsgs.reverse();
      setMessages([...newMsgs, ...messages]);
      setHasNextPage(length > LIMIT);
    }
  };

  const fillSenderData = (docs: QueryDocumentSnapshot<DocumentData>[]) => {
    return Promise.all(
      docs.map(async (d) => {
        const senderId = d.data().senderId;
        const user = await getDoc(doc(db, "users", senderId));
        return {
          id: d.id,
          ...d.data(),
          sender: { id: senderId, ...user.data() } as User,
        } as Message;
      }),
    );
  };

  return (
    <section className="flex flex-[2] flex-col">
      <div
        className="w-full flex-1 overflow-y-scroll p-10 pb-20"
        onScroll={handleScrollEvent}
        ref={chatDiv}
      >
        <div className="flex w-full justify-center">
          {!hasNextPage && (
            <h1 className="mb-10 font-montserrat text-sm text-light-gray">
              This is the beginnning of your conversation.
            </h1>
          )}
          {loading && <Spinner size={30} />}
        </div>

        {messages.map((msg) => {
          const fromSelf = msg.sender.id === currentUser?.id;
          return (
            <div
              key={msg.id}
              id={msg.id}
              className={`mb-4 flex font-montserrat ${
                msg.sender.id === currentUser?.id && "flex-row-reverse"
              }`}
            >
              <img
                src={msg.sender.profileImage}
                alt={msg.sender.username}
                className={`h-[50px] w-[50px] border-2 border-light-gray ${
                  msg.sender.id === currentUser?.id ? "ml-5" : "mr-5"
                } rounded-full`}
              />
              {msg.messageType == "TEXT" ? (
                <div
                  key={msg.id}
                  className={`inline-flex max-w-[50%] flex-wrap rounded-[10px] bg-dark-blue px-5 py-3 ${
                    fromSelf && "float-right bg-dark-purple-highlight"
                  }`}
                >
                  <p
                    className={`flex items-center text-sm ${fromSelf ? "text-black" : "text-dark-gray"}`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {msg.message}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg">
                  <ChatImage src={msg.message} />
                </div>
              )}
            </div>
          );
        })}
        <div ref={chatBottom}></div>
        {imageModalOpen && (
          <AddImageForm chatId={params.id} closeModal={closeImageModal} />
        )}
      </div>
      <div className="relative">
        <div className="absolute bottom-5 w-full px-10">
          {showScrollBottom && (
            <div className="mb-3 flex w-full justify-center">
              <div
                className="ease cursor-pointer rounded-full bg-white p-[2px] shadow-md transition-all
                  hover:scale-110"
                onClick={() => {
                  chatBottom.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <BiChevronDown className="h-8 w-8" />
              </div>
            </div>
          )}
          <MessageForm id={params.id} openImageModal={openImageModal} />
        </div>
      </div>
    </section>
  );
}
