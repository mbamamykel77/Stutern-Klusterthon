import express from 'express';
import userController from "../controllers/user.signup.js"
import userloginController from "../controllers/user.login.js"
import authUser from '../middleware/auth.user.js';
import produceController from '../controllers/produce.controller.js';
// import ensureOwnership from '../middleware/farmers.auth.js';
import  chatController from '../controllers/chat.control.js';
import getUserProfiles from "../controllers/user.profiles.js"
import fetchWeatherData from "../controllers/weather.control.js"


const router = express.Router();

// auth
router.post("/signup", userController.signup);
router.post("/signin", userloginController.signin);

// get user profile
router.get('/profiles', authUser, getUserProfiles);


// produce route
router.post("/produce/create", authUser, produceController.addProduce)
router.get('/produce/list/:userId', authUser, produceController.getProduce);
router.put('/produce/update/:userId/:produceId', authUser, produceController.updateProduce);
router.delete('/produce/delete/:userId/:produceId', authUser, produceController.deleteProduce);

// chat route
router.post("/chat", authUser, chatController.chat)
router.get('/chatHistory', authUser, chatController.getChatHistory);


// weather route
router.get("/weather", authUser, fetchWeatherData)



export { router };
