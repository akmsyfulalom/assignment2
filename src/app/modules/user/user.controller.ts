/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { users: userData } = req.body;
    const result = await userServices.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
    console.log(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Successfully get all users',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber: number = parseInt(userId);
    const result = await userServices.getSingleUserFromDB(userIdNumber);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

// const updateSingleUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const userIdnumber: number = parseInt(userId, 10);
//     const { updatedData } = req.body;
//     console.log("1",updatedData )

//     // if(updatedData || typeof updatedData !== 'object'){
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Something went wrong or missing data"
//     //   })
//     // }



//     const result = await userServices.updateSingleUserFromDB(userIdnumber, updatedData);

//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong!',
//       error,
//     });
//   }
// };

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    // Extract data from the request
    const { userId } = req.params;
   
    const userIdNumber: number = parseInt(userId, 10);
    const  updatedData  = req.body.users;
    console.log("updatedData", updatedData)

    // Validate if updatedData is an object
    if (!updatedData || typeof updatedData !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing updated data',
      });
    }
    const result = await userServices.updateSingleUserFromDB(userIdNumber, updatedData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
};
