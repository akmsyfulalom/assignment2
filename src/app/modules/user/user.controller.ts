/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userValidationSchema } from './user.validation';
import { z } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const { users: userData } = req.body;
    const zodData = userValidationSchema.parse(userData)
    console.log(zodData)
    const result = await userServices.createUserIntoDB(zodData);
    
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {

    if(error instanceof z.ZodError){
      const errorMessages = error.errors.map((err) => err.message);

      res.status(400).json({
        success: false ,
        message: 'Validation error',
        error: errorMessages
      })
    }else{
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error,
      });
    }
  }
    
  }
 

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
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};


const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
   
    const userIdNumber: number = parseInt(userId, 10);
    const  updatedData  = req.body.users;


    if (!updatedData || typeof updatedData !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing updated data',
      });
    }

    const result = await userServices.updateSingleUserFromDB(userIdNumber, updatedData);

    if (!result) {
      return res.status(404).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
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

const deleteAUser = async(req: Request, res: Response) =>{
  try {
    const {userId} = req.params;
    const userIdNumber: number = parseInt(userId);
    const result = await userServices.deleteAUserFromDB(userIdNumber)
    if(result && result.deletedCount && result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }else{
      res.status(404).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    }

  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteAUser
};
