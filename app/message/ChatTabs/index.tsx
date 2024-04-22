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
    <aside className="flex-1 overflow-hidden bg-[#040f1f] px-14 font-montserrat text-lg text-dark-gray">
      <div className="my-9 flex h-[30px] items-center">
        <h2 className="flex-1 text-xl">Messaging</h2>
        <FiEdit
          className="h-5 w-5 transition-all hover:scale-110 hover:cursor-pointer"
          onClick={openModal}
        />
      </div>
      {chats.map((chat) => (
        <Link
          key={chat.id}
          className="flex items-center gap-4 rounded-[5px] p-3 hover:cursor-pointer
            hover:bg-dark-blue"
          href={`/message/${chat.id}`}
          prefetch={true}
        >
          {currentUser && (
            <img
              className="h-10 w-10 rounded-full border-2 border-light-gray"
              src={
                chat.users.filter((user) => user.id !== currentUser.id)[0]
                  ?.profileImage
              }
              alt="chat user profile image"
            />
          )}
          <p className="overflow-hidden text-ellipsis">
            {chat.users
              .filter((user) => user.id !== currentUser?.id)
              .map((user) => user.username)
              .join(", ")}
          </p>
        </Link>
      ))}
    </aside>
  );
};

export default ChatTabs;
