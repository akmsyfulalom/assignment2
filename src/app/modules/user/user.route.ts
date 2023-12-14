import express from "express"
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateSingleUser);
router.delete('/:userId', UserControllers.deleteAUser);
router.put('/:userId/orders', UserControllers.userOrderCreate);
router.get('/:userId/orders', UserControllers.getAllOrdersAUserController)
router.get('/:userId/orders/total-price', UserControllers.calculateTotalPriceOfOrdersForASpecificUserController)

export const UserRoutes = router;

