import React from 'react';
import './App.css';
import System from "./components/System";
import 'bootstrap/dist/css/bootstrap.min.css';
import {API_ENDPOINT_URL} from "./config";

function App() {
    return (
        <div className={"container position-absolute top-50 start-50 translate-middle card"}>
            <div className={"card-body"}>
                <System serverUrl={API_ENDPOINT_URL}/>
            </div>
        </div>
    );
}

export default App;
