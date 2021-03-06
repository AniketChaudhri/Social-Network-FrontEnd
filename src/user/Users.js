import { useState, useEffect } from "react";
import { list } from "./apiUser"

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        })
    }, [])


    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Users</h2>
            <div className="card">
                {users.map((user, i) => (
                    <div key={i}>
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default User;