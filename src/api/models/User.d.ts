export type User = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  isNewUser: boolean;
};
