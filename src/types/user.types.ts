export type User = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  token: string;
};

export type LoginData = {
  email: string;
  password: string;
};

type OmitUser = Omit<User, 'id' | 'token'>;
export interface UserCreation extends OmitUser {
  password: string;
  confirmPassword: string;
}

export type EditProfileData = {
  name: string;
  phoneNumber: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
