import React from 'react';
import './customStyle.css';
import System from "./components/System";
import {APP_SITE_URL} from "./config";

function App() {
    return (
        <div className={"container position-absolute top-50 start-50 translate-middle card bg-dark p-1"}>
            <div className={"card-body"}>
                <System serverUrl={APP_SITE_URL}/>
            </div>
        </div>
    );
}

export default App;
