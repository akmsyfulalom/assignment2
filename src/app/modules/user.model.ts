/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TAddress, TOrder, TUser, TUserName, UserStaticMethodModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, "max length can't longer 20 character"],
    trim: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: 'First name can only contain alphabetical characters',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: [20, "max length can't longer 20 character"],
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: 'Last name can only contain alphabetical characters',
    },
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

const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product Name Is Required'],
  },
  price: {
    type: Number,
    required: [true, 'Price Is Required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity Is Required'],
  },
});

const UserSchema = new Schema<TUser, UserStaticMethodModel>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    unique: true,
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
  orders: [{ type: OrderSchema }],
});

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// use password exclude
UserSchema.set('toJSON', {
  transform: function(doc, upDate) {
    delete upDate.password;
    return upDate
  }
})

UserSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

// query
UserSchema.pre('find', function (next) {
  this.find().select('-password -orders -hobbies -isActive');
  next();
});

UserSchema.pre('findOne', function (next) {
  this.findOne().select('-password');
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate().select('-password');
  next();
});


// static method: check user exist or not 
UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({userId});

  return existingUser;
};


export const UserModel = model<TUser, UserStaticMethodModel>('User', UserSchema);
