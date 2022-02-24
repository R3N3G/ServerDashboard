import React, {useCallback, useEffect, useRef, useState} from "react";
import {BasicHostInformation, BasicSystemInformation, LiveInformation, StaticInformation} from "../../types/system";
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
    const [cpuBasics, setCpuBasics] = useState<BasicSystemInformation>({
        value: "", percentage: 0,
    })
    const [ramBasics, setRamBasics] = useState<BasicSystemInformation>({
        value: "", percentage: 0,
    })
    const [diskBasics, setDiskBasics] = useState<BasicSystemInformation>({
        value: "", percentage: 0,
    })
    const [hostBasics, setHostBasics] = useState<BasicHostInformation>({
        uptime: ""
    })
    const [staticSystem, setStaticSystem] = useState<StaticInformation>({
        disk: {readable: "", value: 0, unit: 0,},
        host: {server_name: "", operating_system: "", platform: "", platform_version: "", processes: 0, partitions: 0},
        ram: {readable: "", value: 0, unit: 0,},
        processor: {name: "", speed: "", threads: 0, architecture: "",}
    })

    const amountOfChartValues = 40;
    const [cpuChartData] = useState<string[]>(Array(amountOfChartValues).fill("0"));
    const [ramChartData] = useState<string[]>(Array(amountOfChartValues).fill("0"));
    const [diskChartData] = useState<string[]>(Array(amountOfChartValues).fill("0"));
    const [chartLabelX] = useState<string[]>([...Array(amountOfChartValues)].map((value, index) => {
        return amountOfChartValues - index + " seconds ago";
    }))

    const updateCharts = (message: LiveInformation) => {
        cpuChartData.shift()
        cpuChartData.push(message.cpu.percentage.toString())
        ramChartData.shift()
        ramChartData.push(message.ram.percentage.toString())
        diskChartData.shift()
        diskChartData.push(message.disk.percentage.toString())
    }

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
                setHostBasics(message.host);
                updateCharts(message)
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
            <div className={"row g-0 m-0 pb-3"}>
                <Card element={
                    <SystemExtras
                        staticInformation={staticSystem}
                        basicInformation={hostBasics}
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
                            info2: "Max: " + staticSystem.processor.speed,
                        }}
                        basicInformation={cpuBasics}
                        extraInformation={{
                            color: "primary", icon: faMicrochip, chartData: cpuChartData, chartLabelX: chartLabelX,
                        }}
                    />
                }/>
                <Card element={
                    <System
                        staticInfo={{
                            name: "Memory",
                            info1: "Total: " + staticSystem.ram.readable,
                            info2: staticSystem.processor.architecture,
                        }}
                        basicInformation={ramBasics}
                        extraInformation={{
                            color: "secondary", icon: faMemory, chartData: ramChartData, chartLabelX: chartLabelX,
                        }}
                    />
                }/>
                <Card element={
                    <System
                        staticInfo={{
                            name: "Disk",
                            info1: "Total: " + staticSystem.disk.readable,
                            info2: staticSystem.host.partitions + " Partitions",
                        }}
                        basicInformation={diskBasics}
                        extraInformation={{
                            color: "success", icon: faHardDrive, chartData: diskChartData, chartLabelX: chartLabelX,
                        }}
                    />
                }/>
            </div>
        </div>
    );
}

export default Dashboard;
