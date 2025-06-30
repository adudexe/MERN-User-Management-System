import { userRepo } from "../repo/UserRepo";
import { UserLogin } from "../../use_cases/user/UserLogin";
import { UserRegister } from "../../use_cases/user/UserRegister"
import { UserController } from "../../interfaces/Controller/userController";
import { UserHome } from "../../use_cases/user/UserHome";

// ---------------User Side----------------------
const userRepository = new userRepo();
const userLogin = new UserLogin(userRepository);
const userRegister = new UserRegister(userRepository);
const userHome = new UserHome(userRepository);
export const userController = new UserController(userLogin,userRegister,userHome);


// -------------------Admin Side--------------------
