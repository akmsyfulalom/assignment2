import { UserModel } from '../user.model';
import { TUser } from './user.interface';

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


const updateSingleUserFromDB = async (userId: number, updatedData: Partial<TUser>,): Promise<TUser | null> => {
  try {
    const existingUser = await UserModel.findOne({
        username: updatedData.username,
    });

    if(existingUser && updatedData.userId !== userId){
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

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
};
