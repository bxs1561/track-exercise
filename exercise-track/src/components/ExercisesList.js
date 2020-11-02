import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios"

function ExercisesList() {
    const [exercises, setExercises] = useState([]);


    const Exercise = ({exercise, deleteExercise}) => (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+exercise._id}>edit</Link> | <a href="#" onClick={() => { deleteExercise(exercise._id) }}>delete</a>
            </td>
        </tr>

    )


    useEffect(()=>{
        axios.get("http://localhost:9000/exercises")
            .then(response=>{
                // console.log(response.data)
                setExercises(response.data)})
            .catch(err=>{console.log(err)})
    },[])

    // useEffect(()=>{
    //
    // })
    const deleteExercise=(id)=>{
        axios.delete("http://localhost:9000/exercises/"+id)
            .then(response=>
                console.log(response.data));
        setExercises(exercises.filter(exercise=>exercise._id !==id))
    };
    useEffect(()=>{
        deleteExercise();
    },[]);

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {exercises.map(exe=>(
                    <Exercise exercise={exe} key={exe._id} deleteExercise={deleteExercise}/>
                ))}
                </tbody>
            </table>
        </div>
    )

}
export default ExercisesList
