import React, {useCallback, useEffect, useRef, useState} from "react";
import {Live, Static, SystemType} from "../../types/system";
import axios from "axios";
import {faHardDrive, faMemory, faMicrochip, faServer} from "@fortawesome/free-solid-svg-icons";
import SystemLive from "./SystemLive";
import SystemExtras from "./SystemExtras";
import CardSmall from "./CardSmall";

const System = () => {
    const origin = process.env.NODE_ENV == "development" ? "http://localhost:4000" : window.origin;
    const webSocketUrl = origin.replace('http', 'ws') + '/system/ws/';
    const staticSystemUrl = origin + '/system/static/';

    const webSocket = useRef<WebSocket | null>(null);
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

    const initWebsocket = useCallback(() => {
        webSocket.current = new WebSocket(webSocketUrl);
        if (webSocket.current) {
            webSocket.current.onclose = () => {
                setTimeout(function () {
                    initWebsocket();
                }, 2000);
            };
            webSocket.current.onmessage = (evt) => {
                const message: Live = JSON.parse(evt.data)
                setLiveSystem(message);
            }
            webSocket.current.onclose = () => {
                webSocket.current = null;
            }
        }
    }, [webSocket, webSocketUrl]);

    const getStaticSystem = useCallback(() => {
        axios.get(staticSystemUrl)
            .then((res) => {
                const staticSystem: Static = res.data as Static;
                setStaticSystem(staticSystem);
            });
    }, [staticSystemUrl]);

    useEffect(() => {
        initWebsocket();
        getStaticSystem();
    }, [initWebsocket, getStaticSystem])

    return (
        <div className={"row vh-100 align-items-center text-center"}>
            <div className={"row g-3 m-0"}>
                <CardSmall element={
                    <SystemExtras
                        systemType={staticSystem.extras}
                        icon={faServer}
                        name={"System"}
                        color={"primary"}
                    />}
                />
                <CardSmall element={
                    <SystemLive
                        systemType={systemCpu}
                        percentage={liveSystem.percentage.cpu}
                        staticValue={staticSystem.values.cpu}
                    />}
                />
                <CardSmall element={
                    <SystemLive
                        systemType={systemRam}
                        percentage={liveSystem.percentage.ram}
                        liveValue={liveSystem.values.ram}
                        staticValue={staticSystem.values.ram}
                    />}
                />
                <CardSmall element={
                    <SystemLive
                        systemType={systemDisk}
                        percentage={liveSystem.percentage.disk}
                        liveValue={liveSystem.values.disk}
                        staticValue={staticSystem.values.disk}
                    />}
                />
            </div>
        </div>
    );
}

interface Props {
    serverUrl: string;
}

export default System;
