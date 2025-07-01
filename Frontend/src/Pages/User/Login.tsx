import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import type { dispatchState,RootState } from "../../services/store";
import { login } from "../../services/Slice/UserLogin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



function Login(){
    const state = useSelector((state:RootState) => state.auth)
    const dispatch = useDispatch<dispatchState>()

    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
       setEmail(e.target.value); 
    };

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            await dispatch(login({ email, password })).unwrap();
            toast.success("Login successful!");
        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };

    return(<>
        <div className="h-screen w-full flex justify-center items-center">
           <div className="border h-200 w-200 rounded-[3%] flex justify-around items-center p-10">
            <div className=" h-full rounded-4xl w-100 flex flex-col items-center justify-center gap-4">
                <p className="text-4xl">Login</p>
                {/* <div className="border w-60 h-60 rounded-full "></div> */}
            </div>
            <div className=" h-full rounded-4xl w-100 flex flex-col justify-center items-center">
                <div>
                <p className="my-3">Email</p>
                    <input id="email" type="text" placeholder="email" className="border p-3 pe-8 rounded-xl" onChange={handleEmail} value={email} />
                </div>
                <div >
                <p className="my-3">Passowrd</p>
                    <input id="password" type="text" placeholder="password" className="border p-3 pe-8 rounded-xl"onChange={handlePassword} value={password}/>
                </div>
                <button className="mt-8 px-23 p-2 bg-pink-300 outline-none rounded-2xl hover:cursor-pointer hover:bg-pink-500 active:bg-pink-700" onClick={handleLogin}>Login</button>
                <div className="my-3">
                    <Link to='/singup'>SignUp?</Link>
                </div>
            </div>
           </div> 
        </div>
    </>)
}


export default Login