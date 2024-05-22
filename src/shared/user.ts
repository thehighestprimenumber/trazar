import { User } from 'firebase/auth';

export enum UserRoles {
  // eslint-disable-next-line no-unused-vars
  SUPER_ADMIN = 'superadmin',
  // eslint-disable-next-line no-unused-vars
  ADMIN = 'admin'
}

export interface UserData extends User {
  roles: { [role: string]: boolean };
}

export interface UserFullData extends UserData {
  id: string;
}


export interface IUser extends User {
  data?: UserFullData;
}

export type UserChange = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof IUser]: IUser[keyof IUser];
};
