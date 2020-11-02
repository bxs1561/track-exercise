import React, {useState} from "react";
import axios from "axios"

function CreateUser() {
    const [username, setUsername] = useState("");

    const onSubmit=(e)=>{
        e.preventDefault();
        const user = {
            username: username
        };
        setUsername("");
        console.log(user);

        axios.post("http://localhost:9000/users/add",user)
            .then(response=>console.log(response.data))

        window.location.href = "/create"
    }
    return(
        <div className="d-flex justify-content-center">
            <div>
                <h3>Create New User</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    )

}
export default CreateUser
