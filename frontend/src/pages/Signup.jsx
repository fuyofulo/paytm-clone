import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Title content={"Sign Up"}/>
                    <SubTitle content={"Enter your information to create an account"}/>
                    <InputBox onChange={(e) => { setfirstName(e.target.value) }} label={"First Name"} placeholder='Zaid'/>
                    <InputBox onChange={(e) => { setLastName(e.target.value) }} label={"Last Name"} placeholder='Khan'/>
                    <InputBox onChange={(e) => { setUsername(e.target.value) }} label={"Email"} placeholder='fuyofulo@gmail.com'/>
                    <InputBox onChange={(e) => { setPassword(e.target.value) }} label={"Password"} placeholder='123456'/>
                    <div className="pt-4">
                        <Button onClick={ async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            console.log(response);
                            localStorage.setItem("token", response.data.token)
                            navigate('/dashboard')
                        }} content={"Sign Up"}/>
                    </div>
                    <BottomWarning content={"Already have an account?"} content2={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}

export default Signup;