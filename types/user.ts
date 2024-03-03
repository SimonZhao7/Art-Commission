export type User = {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  profileImage: string;
  ratingId: string;
  chatIds: string[];
  socialIds: string[];
  bio: string;
  lastOnline: Date;
  dateCreated: Date;
}