import { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://34.121.83.17:3000/api/v1/user/bulk?filter="+ filter)
        .then(response => {
            setUsers(response.data.user)
        })
    }, [filter])

    return <div>
        <div className="font-bold">
            Users
        </div>
        <div>
            <input onChange={(e) => { setFilter(e.target.value)}} type="text" placeholder="Search users...." 
            className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </div>
}

function User ({ user }) {

    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} content={'send money'}></Button>
        </div>
    </div>
}

export default Users;