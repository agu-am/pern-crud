import Router from "express-promise-router";
import { signin, signup, logout, profile } from "../controllers/auth.controller.js"
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/signin', validateSchema(signInSchema), signin)
router.post('/signup', validateSchema(signUpSchema), signup)
router.post('/logout', logout)
router.get('/profile', isAuth, profile)

export default router