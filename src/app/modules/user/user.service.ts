import { UserModel } from '../user.model';
import { TOrder, TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateSingleUserFromDB = async (
  userId: number,
  updatedData: Partial<TUser>,
): Promise<TUser | null> => {
  try {
    const existingUser = await UserModel.findOne({
      userId: updatedData.userId,
    });

    if (existingUser && updatedData.userId !== userId) {
      throw new Error("User can't exist on this id ");
    }
    const result = await UserModel.findOneAndUpdate(
      { userId },
      { $set: updatedData },
      { new: true },
    );
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
// delete user
const deleteAUserFromDB = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};
// create order 
const usersOrdersFromDB = async (userId: number, order: TOrder) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: order } },
      { new: true },
    );
    return result;
  } else {
      throw new Error("Could't create your order");
  }
};

// get all orders for a  user

const getAllOrdersFromDB = async (userId: number) => {
  if(await  UserModel.isUserExists(userId)){
    const userData = await UserModel.findOne({userId});
    return {
      orders: userData?.orders || []
    }
   
  }
  else {
    throw new Error('User not found')
  }
  
};

// Calculate Total Price of Orders for a Specific User calculateTotalPriceOfOrdersForASpecificUser

const calculateTotalPriceOfOrdersForASpecificUser = async(userId: number) =>{
  if(await UserModel.isUserExists(userId)){
    const result = await UserModel.aggregate([
      {$match: {userId}},
      {$unwind: {path: '$orders', preserveNullAndEmptyArrays: true}}, 
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: {$multiply: ['$orders.price', '$orders.quantity']}
          }
        }
      }
    ])
    return result
  }
  else {
    throw new Error('User not found');
  }
}



export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteAUserFromDB,
  usersOrdersFromDB,
  getAllOrdersFromDB,
  calculateTotalPriceOfOrdersForASpecificUser,
};
