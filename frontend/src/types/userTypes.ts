export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  identifier: string; // can be either username or email
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture?: string;
  dateOfBirth?: string;
  token: string;
}
