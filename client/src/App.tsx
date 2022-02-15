import React from 'react';
import './App.css';
import System from "./components/System";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className={"container position-absolute top-50 start-50 translate-middle card"}>
            <div className={"card-body"}>
                <System serverUrl={"http://localhost:4000/system"}/>
            </div>
        </div>
    );
}

export default App;
