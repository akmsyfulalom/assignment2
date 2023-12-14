import { Model } from "mongoose";

export type TUserName ={
    firstName: string;
    lastName: string;
}
export type TAddress = {
    street: string;
    city: string;
    country: string;
}

export type TUser = {
    userId: number;
    username: string;
    password: string; 
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address:TAddress;
    orders?: TOrder[];
  };
  
 export type TOrder = {
    productName: string;
    price: number;
    quantity: number;
  };


  // static method interface 
  export interface UserStaticMethodModel extends Model<TUser>{
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: number): Promise<TUser | null>
  }
 