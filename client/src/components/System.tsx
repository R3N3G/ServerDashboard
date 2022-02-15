import StaticSystem from "./StaticSystem";
import LiveSystem from "./LiveSystem";
import React, {FC, useEffect, useState} from "react";
import {Live, Static} from "../../types/system";
import axios from "axios";
import {faHardDrive, faMemory, faMicrochip} from "@fortawesome/free-solid-svg-icons";

const System: FC<Props> = ({serverUrl}) => {
    let webSocket;
    const webSocketUrl = serverUrl.replace('http', 'ws') + '/system/ws/';
    const staticSystemUrl = serverUrl + '/system/static/';

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
        <div className={"text-center"}>
            <div className={"mb-5"}>
                <StaticSystem name={"OS"}
                              variant={"primary"}
                              value={staticSystem.extras.operating_system}/>
                <StaticSystem name={"Architecture"}
                              variant={"primary"}
                              value={staticSystem.extras.processor_architecture}/>
                <StaticSystem name={"Go"}
                              variant={"primary"}
                              value={staticSystem.extras.go_version}/>
            </div>
            <div>
                <LiveSystem name={"CPU"} variant={"danger"} icon={faMicrochip}
                            value={staticSystem.values.cpu}
                            percentage={liveSystem.percentage.cpu}/>
                <LiveSystem name={"Memory"} variant={"warning"} icon={faMemory}
                            value={liveSystem.values.ram + "/" + staticSystem.values.ram}
                            percentage={liveSystem.percentage.ram}/>
                <LiveSystem name={"Disk"} variant={"info"} icon={faHardDrive}
                            value={liveSystem.values.disk + "/" + staticSystem.values.disk}
                            percentage={liveSystem.percentage.disk}/>
            </div>
        </div>
    );
}

interface Props {
    serverUrl: string;
}

export default System;
