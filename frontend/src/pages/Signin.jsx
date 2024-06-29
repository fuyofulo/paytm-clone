import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 

const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Title content={"Sign In"}/>
                <SubTitle content={"Enter your credentials to access your account"}/>
                <InputBox onChange={(e) => { setUsername(e.target.value) }} label={"Email"} placeholder='fuyofulo@gmail.com'/>
                <InputBox onChange={(e) => { setPassword(e.target.value) }} label={"Password"} placeholder='123456'/>
                <div className="pt-4">
                    <Button onClick={ async () => {
                        const response = await axios.post("http://34.121.83.17:3000/api/v1/user/signin", {
                            username,
                            password,
                        });
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("username", username);
                        navigate("/dashboard");
                    }} content={"Sign In"}/>
                </div>
                <BottomWarning content={"Don't have an account?"} content2={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}

export default Signin; 