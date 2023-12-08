import { Schema, model, connect } from "mongoose";


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
    orders?: Order[];
  };
  
 export type Order = {
    productName: string;
    price: number;
    quantity: number;
  };
 