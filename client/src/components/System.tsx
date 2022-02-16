import React, {FC, useEffect, useState} from "react";
import {Live, Static, SystemType} from "../../types/system";
import axios from "axios";
import {faHardDrive, faMemory, faMicrochip, faServer} from "@fortawesome/free-solid-svg-icons";
import LiveComponent from "./LiveComponent";
import ExtrasComponent from "./ExtrasComponent";

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
    const [systemCpu] = useState<SystemType>({
        color: "danger",
        icon: faMicrochip,
        name: "CPU",
    });
    const [systemRam] = useState<SystemType>({
        color: "warning",
        icon: faMemory,
        name: "Memory",
    });
    const [systemDisk] = useState<SystemType>({
        color: "info",
        icon: faHardDrive,
        name: "Disk",
    });

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
        <div className={"row vh-100 align-items-center text-center"}>
            <div className={"row g-3 m-0"}>
                <ExtrasComponent
                    systemType={staticSystem.extras}
                    icon={faServer}
                    name={"System"}
                    color={"primary"}
                />
                <LiveComponent
                    systemType={systemCpu}
                    percentage={liveSystem.percentage.cpu}
                    staticValue={staticSystem.values.cpu}
                />
                <LiveComponent
                    systemType={systemRam}
                    percentage={liveSystem.percentage.ram}
                    liveValue={liveSystem.values.ram}
                    staticValue={staticSystem.values.ram}
                />
                <LiveComponent
                    systemType={systemDisk}
                    percentage={liveSystem.percentage.disk}
                    liveValue={liveSystem.values.disk}
                    staticValue={staticSystem.values.disk}
                />
            </div>
        </div>
    );
}

interface Props {
    serverUrl: string;
}

export default System;
