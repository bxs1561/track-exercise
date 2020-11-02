import React, {useEffect, useState} from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function EditExercises(props) {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    //get the exercise data from database
    useEffect(()=>{
        axios.get("http://localhost:9000/exercises/"+props.match.params.id)
            .then(response=>{
                setUsername(response.data.username);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setDate(new Date(response.data.date))
            }).catch(err=>console.log(err))
    },[]);

    useEffect(()=>{
        axios.get("http://localhost:9000/users")
            .then(response=>{
                setUsers(response.data.map(user=>user.username))
            }).catch(err=>console.log(err));
    },[]);

    const changeDuration=(e)=>{
        setDuration(e.target.value)
    }

    const changeDate=(date)=>{
        setDate(date)
    }

    const onSubmit =(e)=> {
        e.preventDefault();
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        }
        console.log(exercise)
        axios.post("http://localhost:9000/exercises/update/" + props.match.params.id, exercise)
            .then(response => console.log(response.data));
        window.location.href = "/";
    }
    console.log(duration)

        return(
            <div className="d-flex justify-content-center">
                <div>
                    <h3>Edit Exercise Log</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select
                                className="form-control"
                                defaultValue={username}
                                onChange={event => setUsername(event.target.value)}>
                                {
                                    users.map((user)=> {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                        </option>;
                                    })
                                })
                                }
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input  type="text"
                                    required
                                    className="form-control"
                                    defaultValue={description}
                                    onChange={event => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration (in minutes): </label>
                            <input
                                type="text"
                                className="form-control"
                                value={duration}
                                onChange={changeDuration}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                            <DatePicker
                                selected={date}
                                onChange={changeDate}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            </div>
    )

}
export default EditExercises
