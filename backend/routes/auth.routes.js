import { Router } from 'express';
import express from 'express';
import { login, logout, signup } from '../controllers/auth.controllers.js';
import upload from '../middlewares/multer.js';

const authRouter=express(Router());
authRouter.post("/signup",upload.single("profileImage"),signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);


export default authRouter;