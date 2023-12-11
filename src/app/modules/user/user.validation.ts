import { z  } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).trim(),
  lastName: z.string().min(1).max(20),
});

const userAddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const userOrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema  = z.object({
  userId: z.number().positive('User id must be a positive number'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  fullName: userNameValidationSchema,
  age: z.number().positive('Age must be a positive number'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(userOrderValidationSchema),
});

export { userValidationSchema};
