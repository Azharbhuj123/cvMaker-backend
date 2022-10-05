const { Router } = require("express");
const { userController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const upload = require("../../middlewares/multer");

const router = Router();

// router
//   .route("/")
//   .post(
//     validate(userValidation.createUser),
//     userController.createUser
//   )
//   .get(auth(),userController.getAllUser);
// router
//   .route("/:id")
//   .get(userController.getUserById)
//   .delete(userController.deleteUser)
//   .put(userController.updateUserById);

router.route("/mail").post(
  upload.single("cv"),
  // validate(userValidation.sendMail),
  userController.sendMailToClient
);

module.exports = router;
