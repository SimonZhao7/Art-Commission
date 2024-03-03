import { User } from "./user";

export type Chat = {
  id: string;
  messages: string[];
  users: User[];
}