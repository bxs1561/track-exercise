import React from "react"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import EditExercises from "./components/EditExercises";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import ExercisesList from "./components/ExercisesList";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <br/>
        <Route path="/" exact component={ExercisesList}/>
        <Route path="/edit/:id" component={EditExercises}/>
        <Route path="/create" component={CreateExercise}/>
        <Route path="/user" component={CreateUser}/>

      </Router>

    </div>
  );
}

export default App;
