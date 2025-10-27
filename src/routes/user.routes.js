import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//Secured routes

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshAccessToken").post(refreshAccessToken);

router.route("/changePassword").post(verifyJWT, changeCurrentPassword);

router.route("/currentUser").get(verifyJWT, getCurrentUser);

router.route("/updateAccountDetails").post(verifyJWT, updateAccountDetails);

router
  .route("/updateAvatar")
  .post(upload.single("avatar"), verifyJWT, updateUserAvatar);

router
  .route("/updateCoverImage")
  .post(upload.single("coverImage"), verifyJWT, updateUserCoverImage);

export default router;