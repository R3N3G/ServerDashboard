import StaticSystem from "./StaticSystem";
import LiveSystem from "./LiveSystem";
import React, {FC, useEffect, useState} from "react";
import {Live, Static} from "../../types/system";
import axios from "axios";

const System: FC<Props> = ({serverUrl}) => {
    let webSocket;
    const webSocketUrl = serverUrl.replace("http", "ws") + '/ws/';
    const staticSystemUrl = serverUrl + '/static/';

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
    }, [])

    const initWebsocket = () => {
        webSocket = new WebSocket(webSocketUrl)
        if (webSocket) {
            webSocket.onclose = () => {
                setTimeout(function () {
                    initWebsocket();
                }, 2000);
            };
            webSocket.onmessage = (evt) => {
                const message: Live = JSON.parse(evt.data)
                setLiveSystem(message);
            }
            webSocket.onclose = () => {
                webSocket = null;
            }
        }
    }

    const getStaticSystem = () => {
        axios.get(staticSystemUrl)
            .then((res) => {
                const staticSystem: Static = res.data as Static;
                setStaticSystem(staticSystem);
            });
    }

    return (
        <div>
            <h1 className={"mb-5 fw-bolder"}>Live-System</h1>
            <div className={"mb-5 card"}>
                <div className={"card-body"}>
                    <LiveSystem name={"CPU"} variant={"danger"}
                                value={staticSystem.values.cpu}
                                percentage={liveSystem.percentage.cpu}/>
                    <LiveSystem name={"Disk"} variant={"primary"}
                                value={liveSystem.values.disk + "/" + staticSystem.values.disk}
                                percentage={liveSystem.percentage.disk}/>
                    <LiveSystem name={"Memory"} variant={"warning"}
                                value={liveSystem.values.ram + "/" + staticSystem.values.ram}
                                percentage={liveSystem.percentage.ram}/>
                </div>
            </div>
            <div className={"card"}>
                <div className={"card-body"}>
                    <StaticSystem name={"OS"}
                                  variant={"info"}
                                  value={staticSystem.extras.operating_system}/>
                    <StaticSystem name={"Architecture"}
                                  variant={"info"}
                                  value={staticSystem.extras.processor_architecture}/>
                    <StaticSystem name={"Go"}
                                  variant={"info"}
                                  value={staticSystem.extras.go_version}/>
                </div>
            </div>
        </div>
    );
}

interface Props {
    serverUrl: string;
}

export default System;
