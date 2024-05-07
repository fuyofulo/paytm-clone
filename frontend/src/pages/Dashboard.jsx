import { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";


const Dashboard = () => {

    const [ balance, setBalance ] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/account/balance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(
          async (response) => {
    
            const Resbody = await response.json();
    
            if (response.status === 400) {
              console.log('Users Data Fetch Unsuccessful');
            }else{
              console.log('Users Data Fetch Successful', Resbody);
              setBalance(Math.round(Resbody.balance));
            }
          }
        );
      }, [])
    
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance}/> <br />
            <Users />
        </div>
    </div>
}

export default Dashboard;