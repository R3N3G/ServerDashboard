import React from 'react';
import System from "./components/System";
import './customStyle.scss';
import './style.css';
import DarkMode from "./components/darkMode";

function App() {
    return (
        <div className={"container position-relative"}>
            <DarkMode/>
            <System/>
        </div>
    );
}

export default App;
