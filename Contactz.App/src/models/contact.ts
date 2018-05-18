// User model based on the structure of github api at
// https://api.github.com/users/{username}
export interface Contact {
  ID: number,
  Name: string;
  Surname: string;
  Email: string;
  Mobile: string;
  MobileInt: number;
  // Phone: number,
}