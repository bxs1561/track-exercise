import React, {useEffect, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function CreateExercise() {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9000/users")
            .then(response=>{
                if(response.data.length>0){
                    setUsers(response.data.map(user=>user.username))
                    setUsername(response.data[0].username)
                }
            })
    },[])

    const changeUserName=(e)=>{
        setUsername(e.target.value)
    }

    const changeDuration=(e)=>{
        setDuration(e.target.value)
    }
    const changeDate=(date)=>{
        setDate(date)
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        const exercise = {
            username: username,
            description: description,
            duration:duration,
            date: date,
        }
        console.log(exercise)
        axios.post("http://localhost:9000/exercises/add", exercise)
            .then(response=>console.log(response.data))
        // setUsername("")
        // setDescription("")
        // setDuration(0)
        // setDate("")
        // setUsers("")
        window.location.href="/"
    };


    return(
        <div className="d-flex justify-content-center">
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                            required
                            className="form-control"
                            value={username}
                            onChange={changeUserName}>
                        {
                            users.map((user)=> {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input  type="text"
                            required
                            className="form-control"
                            defaultValue={description}
                            onChange={event=>setDescription(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={duration}
                        onChange={changeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={changeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
        </div>
    )

}
export default CreateExercise
