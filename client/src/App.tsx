import React from 'react';
import System from "./components/System";
import {APP_SITE_URL} from "./config";
import './customStyle.scss';

function App() {
    return (
        <div className={"container"}>
            <System serverUrl={APP_SITE_URL}/>
        </div>
    );
}

export default App;
