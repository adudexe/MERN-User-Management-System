import { userRepo } from "../repo/UserRepo";
import { UserLogin } from "../../use_cases/user/UserLogin";
import { UserRegister } from "../../use_cases/user/UserRegister"
import { UserController } from "../../interfaces/Controller/userController";
import { UserHome } from "../../use_cases/user/UserHome";
import { UpdateUser } from "../../use_cases/user/UpdateUser";
import { AdminRepo } from "../repo/AdminRepo";
import { AdminLogin } from "../../use_cases/admin/AdminLogin";
import { AdminHome } from "../../use_cases/admin/AdminHome";
import { AdminUpdateUser } from "../../use_cases/admin/AdminUpdateUser";
import { AdminAddUser } from "../../use_cases/admin/AdminAddUser";
import { AdminDeleteUser } from "../../use_cases/admin/AdminDeleteUser";
import { AdminController } from "../../interfaces/Controller/adminController";
import { AdminGetUser } from "../../use_cases/admin/AdminGetUser";

// ---------------User Side----------------------
const userRepository = new userRepo();
const userLogin = new UserLogin(userRepository);
const userRegister = new UserRegister(userRepository);
const userHome = new UserHome(userRepository);
const updateUser = new UpdateUser(userRepository)
export const userController = new UserController(userLogin,userRegister,userHome,updateUser);


// -------------------Admin Side--------------------
const adminRepository = new AdminRepo();
const adminLogin =  new AdminLogin(adminRepository);
const adminHome = new AdminHome(adminRepository);
const adminUpdateUser =  new AdminUpdateUser(adminRepository);
const adminAddUser = new AdminAddUser(adminRepository);
const adminDeleteUser = new AdminDeleteUser(adminRepository);
const adminGetUser = new AdminGetUser(adminRepository);
export const adminController = new AdminController(adminAddUser,adminUpdateUser,adminLogin,adminDeleteUser,adminHome,adminGetUser);
