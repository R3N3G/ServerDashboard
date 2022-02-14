import NameAndValue from "./NameAndValue";
import React, {useEffect, useState} from "react";
import {Live, Static} from "../../types/system";
import axios from "axios";


const System = () => {
    const [liveSystem, setLiveSystem] = useState<Live>({
        percentage: {cpu: "", disk: "", ram: ""},
        values: {disk: "", ram: ""}
    })
    const [staticSystem, setStaticSystem] = useState<Static>({
        extras: {go_version: "", operating_system: "", processor_architecture: ""},
        values: {cpu: "", disk: "", ram: ""}
    })

    useEffect(() => {
        getStaticSystem();
        getLiveSystem();
    }, [])

    const getLiveSystem = () => {
        axios.get("http://localhost:8700/system/live/")
            .then((res) => {
                const liveSystem: Live = res.data as Live;
                setLiveSystem(liveSystem);
            });
    }
    const getStaticSystem = () => {
        axios.get("http://localhost:8700/system/static/")
            .then((res) => {
                const staticSystem: Static = res.data as Static;
                setStaticSystem(staticSystem);
            });
    }

    return (
        <div>
            <h1>System:</h1>
            <NameAndValue name={"CPU"} value={liveSystem.percentage.cpu}/>
            <NameAndValue name={"CPU"} value={staticSystem.values.cpu}/>
            <NameAndValue name={"Disk"}
                          value={liveSystem.values.disk + "/" + staticSystem.values.disk + " (" + liveSystem.percentage.disk + ")"}/>
            <NameAndValue name={"Ram"}
                          value={liveSystem.values.ram + "/" + staticSystem.values.ram + " (" + liveSystem.percentage.ram + ")"}/>
            <hr/>
            <NameAndValue name={"OS"} value={staticSystem.extras.operating_system}/>
            <NameAndValue name={"Architecture"} value={staticSystem.extras.processor_architecture}/>
            <NameAndValue name={"Go"} value={staticSystem.extras.go_version}/>
        </div>
    );
}

export default System;
