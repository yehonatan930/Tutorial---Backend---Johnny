/**
 * typical interface for the user object, change as you like.
 */
export interface IUser {
  token: string;
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
