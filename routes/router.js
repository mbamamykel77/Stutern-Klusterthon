import express from 'express';
import userController from "../controllers/user.signup.js"
import userloginController from "../controllers/user.login.js"
import authUser from '../middleware/auth.user.js';
import produceController from '../controllers/produce.controller.js';
// import ensureOwnership from '../middleware/farmers.auth.js';
import chatController from '../controllers/chat.control.js';

const router = express.Router();

// auth
router.post("/signup", userController.signup);
router.post("/signin", userloginController.signin);


// produce route
router.post("/produce/create", authUser, produceController.addProduce)
router.get('/produce/list/:userId', authUser, produceController.getProduce);
router.put('/produce/update/:userId/:produceId', authUser, produceController.updateProduce);
router.delete('/produce/delete/:userId/:produceId', authUser, produceController.deleteProduce);

// chat route
router.post("/chat", authUser, chatController.chat)



export { router };
