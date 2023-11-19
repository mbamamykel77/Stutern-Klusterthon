import express from 'express';
import userController from "../controllers/user.signup.js"
import userloginController from "../controllers/user.login.js"

const router = express.Router();


router.post("/signup", userController.signup);
router.post("/signin", userloginController.signin);



export { router };
