export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface NewUser {
  username: string;
  age: number;
  hobbies: string[];
}

export interface UsersList {
  users: User[];
}
