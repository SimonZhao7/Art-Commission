import { FunctionComponent } from 'react';
import { Chat } from '@/types/chat';

type ChatTabsProps = {
  chats: Chat[];
  openModal: () => void;
};

export type ChatTabsComponent = FunctionComponent<ChatTabsProps>;