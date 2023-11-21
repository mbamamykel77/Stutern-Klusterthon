import express from 'express';
import userController from "../controllers/user.signup.js"
import userloginController from "../controllers/user.login.js"
import authUser from '../middleware/auth.user.js';
import produceController from '../controllers/produce.controller.js';
// import ensureOwnership from '../middleware/farmers.auth.js';

const router = express.Router();

// auth
router.post("/signup", userController.signup);
router.post("/signin", userloginController.signin);


// produce route
router.post("/produce/create", authUser, produceController.addProduce)
router.get('/produce/list', authUser, produceController.getProduce);
router.put('/produce/update/:produceId', authUser, produceController.updateProduce);
router.delete('/produce/delete/:produceId', authUser, produceController.deleteProduce);


export { router };
