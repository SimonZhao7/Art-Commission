import { ReactElement } from "react";
// Components
import ChatTabs from "./ChatTabs";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <main className="flex h-full">
      <ChatTabs />
      {children}
    </main>
  );
}
