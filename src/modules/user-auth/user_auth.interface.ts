/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user_auth.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'tutor';
  isBlocked: boolean;
  passwordChangedAt?: Date;
  updateProfile: boolean;
  imageUrl?: string;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TUserRole = keyof typeof USER_ROLE;

export type TUserWithId = TUser & {
  _id: string;
  createdAt?: string;
  updatedAt: string;
};

/**
 * Tutor Profile update
 */

export interface ITutorProfile {
  id: Types.ObjectId;
  expertise: string[]; // Define as an array
  subjects: string[];
  rating?: { id: Types.ObjectId; rate: number; review: string }[];
  image?: string;
  address: string;
  phone: string;
  earning?: number;
  availability_slot: string[];
  hourly_rate: number;
  totalEarning?: number;
}
