import React, {useCallback, useEffect, useRef, useState} from "react";
import {BasicInformation, LiveInformation, StaticInformation} from "../../types/system";
import axios from "axios";
import {faHardDrive, faMemory, faMicrochip, faServer} from "@fortawesome/free-solid-svg-icons";
import SystemExtras from "./SystemExtras";
import Card from "./Card";
import System from "./System";

const Dashboard = () => {
    const origin = process.env.NODE_ENV === "development" ? "http://localhost:4000" : window.origin;
    const webSocketUrl = origin.replace('http', 'ws') + '/system/ws/';
    const staticSystemUrl = origin + '/system/static/';

    const webSocket = useRef<WebSocket | null>(null);
    const [cpuBasics, setCpuBasics] = useState<BasicInformation>({
        value: "", percentage: 0,
    })
    const [ramBasics, setRamBasics] = useState<BasicInformation>({
        value: "", percentage: 0,
    })
    const [diskBasics, setDiskBasics] = useState<BasicInformation>({
        value: "", percentage: 0,
    })
    const [staticSystem, setStaticSystem] = useState<StaticInformation>({
        disk: {readable: "", value: 0, unit: 0,},
        host: {server_name: "", operating_system: "",},
        ram: {readable: "", value: 0, unit: 0,},
        processor: {name: "", speed: "", threads: 0, architecture: "",}
    })

    const initWebsocket = useCallback(() => {
        webSocket.current = new WebSocket(webSocketUrl);
        if (webSocket.current) {
            webSocket.current.onclose = () => {
                setTimeout(function () {
                    initWebsocket();
                }, 2000);
            };
            webSocket.current.onmessage = (evt) => {
                const message: LiveInformation = JSON.parse(evt.data)
                setCpuBasics(message.cpu);
                setRamBasics(message.ram);
                setDiskBasics(message.disk);
            }
            webSocket.current.onclose = () => {
                webSocket.current = null;
            }
        }
    }, [webSocket, webSocketUrl]);

    const getStaticSystem = useCallback(() => {
        axios.get(staticSystemUrl)
            .then((res) => {
                const staticInformation: StaticInformation = res.data as StaticInformation;
                setStaticSystem(staticInformation);
            });
    }, [staticSystemUrl]);

    useEffect(() => {
        initWebsocket();
        getStaticSystem();
    }, [initWebsocket, getStaticSystem])

    return (
        <div className={"row vh-100 align-items-center"}>
            <div className={"row g-3 m-0 justify-content-center"}>
                <Card element={
                    <SystemExtras
                        staticInformation={staticSystem}
                        extraInformation={{
                            color: "info", icon: faServer,
                        }}
                    />
                }/>
                <Card element={
                    <System
                        staticInfo={{
                            name: "CPU",
                            info1: staticSystem.processor.threads + " Threads",
                            info2: staticSystem.processor.architecture,
                            info3: staticSystem.processor.speed,
                        }}
                        basicInformation={cpuBasics}
                        extraInformation={{
                            color: "primary",
                            icon: faMicrochip,
                        }}
                    />
                }/>
                <Card element={
                    <System
                        staticInfo={{
                            name: "Memory",
                            info1: staticSystem.ram.readable,
                            info2: "string",
                            info3: "string",
                        }}
                        basicInformation={ramBasics}
                        extraInformation={{
                            color: "secondary",
                            icon: faMemory,
                        }}
                    />
                }/>
                <Card element={
                    <System
                        staticInfo={{
                            name: "Disk",
                            info1: staticSystem.disk.readable,
                            info2: "string",
                            info3: "string",
                        }}
                        basicInformation={diskBasics}
                        extraInformation={{
                            color: "success",
                            icon: faHardDrive,
                        }}
                    />
                }/>
            </div>
        </div>
    );
}

export default Dashboard;
