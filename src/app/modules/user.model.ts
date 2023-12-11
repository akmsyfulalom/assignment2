import { Schema, model } from 'mongoose';
import { TAddress, TUser, TUserName } from './user/user.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, "max length can't longer 20 character"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: [20, "max length can't longer 20 character"],
  },
});

const userAddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

const UserSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: userNameSchema,
    required: [true, 'Name is requred'],
    trim: true,
  },

  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is required'],
    trim: true,
  },

  orders: {
    type: [
      {
        productName: String,
        price: Number,
        quantity: Number,
      },
    ],
    default: [],
  },
});


export const UserModel = model<TUser>("User", UserSchema);