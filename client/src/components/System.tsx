import NameAndValue from "./NameAndValue";
import React, {useEffect, useState} from "react";
import {Live, Static} from "../../types/system";
import axios from "axios";
import Percentage from "./Percentage";


const System = () => {
    const [liveSystem, setLiveSystem] = useState<Live>({
        percentage: {cpu: 0, disk: 0, ram: 0},
        values: {disk: "", ram: ""}
    })
    const [staticSystem, setStaticSystem] = useState<Static>({
        extras: {go_version: "", operating_system: "", processor_architecture: ""},
        values: {cpu: "", disk: "", ram: ""}
    })

    useEffect(() => {
        initWebsocket();
        getStaticSystem();
        getLiveSystem();
    }, [])

    const initWebsocket = () => {
        let ws = new WebSocket('ws://localhost:4000/system/ws/')
        if (ws) {
            ws.onmessage = (evt) => {
                const message: Live = JSON.parse(evt.data)
                setLiveSystem(message);
            }
            ws.onerror = () => {
                ws.close()
            }
        }
    }

    const getLiveSystem = () => {
        axios.get("http://localhost:4000/system/live/")
            .then((res) => {
                const liveSystem: Live = res.data as Live;
                setLiveSystem(liveSystem);
            });
    }
    const getStaticSystem = () => {
        axios.get("http://localhost:4000/system/static/")
            .then((res) => {
                const staticSystem: Static = res.data as Static;
                setStaticSystem(staticSystem);
            });
    }

    return (
        <div className={"container"}>
            <h1 className={"mt-5"}>System:</h1>
            <div className={"my-5"}>
                <NameAndValue name={"CPU"} value={staticSystem.values.cpu}/>
                <Percentage percentage={liveSystem.percentage.cpu}/>
                <NameAndValue name={"Disk"}
                              value={liveSystem.values.disk + "/" + staticSystem.values.disk}/>
                <Percentage percentage={liveSystem.percentage.disk}/>
                <NameAndValue name={"Ram"}
                              value={liveSystem.values.ram + "/" + staticSystem.values.ram}/>
                <Percentage percentage={liveSystem.percentage.ram}/>
            </div>
            <div>
                <NameAndValue name={"OS"} value={staticSystem.extras.operating_system}/>
                <NameAndValue name={"Architecture"} value={staticSystem.extras.processor_architecture}/>
                <NameAndValue name={"Go"} value={staticSystem.extras.go_version}/>
            </div>
        </div>
    );
}

export default System;
