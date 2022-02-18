import React, {useCallback, useEffect, useRef, useState} from "react";
import {BasicInformation, LiveInformation, StaticInformation} from "../../types/system";
import axios from "axios";
import {faHardDrive, faMemory, faMicrochip, faServer} from "@fortawesome/free-solid-svg-icons";
import SystemLive from "./SystemLive";
import SystemExtras from "./SystemExtras";
import CardSmall from "./CardSmall";
import CardBig from "./CardBig";

const System = () => {
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
        hostname: "",
        operating_system: "",
        processor: "",
        processor_architecture: "",
        total_cores: 0,
        total_disk_number: 0,
        total_disk_string: "",
        total_ram_number: 0,
        total_ram_string: "",
        total_threads: 0
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
        <div className={"row vh-100 align-items-center text-center"}>
            <div className={"row g-3 m-0 justify-content-center"}>
                <CardBig element={
                    <SystemExtras
                        staticInformation={staticSystem}
                        extraInformation={{
                            color: "info", icon: faServer,
                        }}
                    />}
                />
                <CardSmall element={
                    <SystemLive
                        basicInformation={cpuBasics}
                        extraInformation={{
                            color: "primary", icon: faMicrochip,
                        }}
                    />}
                />
                <CardSmall element={
                    <SystemLive
                        basicInformation={ramBasics}
                        extraInformation={{
                            color: "secondary", icon: faMemory,
                        }}
                    />}
                />
                <CardSmall element={
                    <SystemLive
                        basicInformation={diskBasics}
                        extraInformation={{
                            color: "success", icon: faHardDrive,
                        }}
                    />}
                />
            </div>
        </div>
    );
}

export default System;
