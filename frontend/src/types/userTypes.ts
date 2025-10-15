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
