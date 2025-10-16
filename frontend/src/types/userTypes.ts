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
  phone?: string;
  dateOfBirth?: string;
  userType?: string;
}

export interface UserWithToken {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture?: string;
  phone?: string;
  dateOfBirth?: string;
  userType?: string;
  token: string;
}
