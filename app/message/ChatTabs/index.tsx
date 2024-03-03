import Link from "next/link";
// Types
import { ChatTabsComponent } from "./types";
// Hooks
import { useAuth } from "@/hooks/useFirebaseUser";
// React Icons
import { FiEdit } from "react-icons/fi";


const ChatTabs: ChatTabsComponent = ({ chats, openModal }) => {
  const currentUser = useAuth();

  return (
    <aside className="flex-1 px-14 text-dark-gray text-lg font-montserrat overflow-hidden">
        <div className="flex h-[30px] items-center my-9">
          <h2 className="flex-1 text-xl">Messaging</h2>
          <FiEdit
            className="w-5 h-5 hover:scale-110 hover:cursor-pointer transition-all"
            onClick={openModal}
          />
        </div>
        {chats.map((chat) => (
          <Link
            key={chat.id}
            className="flex items-center gap-4 p-3 hover:cursor-pointer hover:bg-dark-blue-highlight rounded-[5px]"
            href={`/message/${chat.id}`}
            prefetch={true}
          >
            {currentUser && (
              <img
                className="w-10 h-10 rounded-full border-light-gray border-2"
                src={
                  chat.users.filter((user) => user.id !== currentUser.uid)[0]
                    ?.profileImage
                }
                alt="chat user profile image"
              />
            )}
            <p className="text-ellipsis overflow-hidden">
              {chat.users
                .filter((user) => user.id !== currentUser?.uid)
                .map((user) => user.username)
                .join(", ")}
            </p>
          </Link>
        ))}
      </aside>
  )
}

export default ChatTabs;