import React, {useEffect, useRef, useState} from "react";
import {BasicHostInformation, BasicSystemInformation, LiveInformation, StaticInformation} from "../../types/system";
import axios from "axios";
import {faHardDrive, faMemory, faMicrochip, faServer} from "@fortawesome/free-solid-svg-icons";
import OverviewCard from "./OverviewCard";
import CardWrapper from "./CardWrapper";
import LiveCard from "./LiveCard";
import {API_ENDPOINT_URL} from "../config";

const Dashboard = () => {
    const webSocketUrl = API_ENDPOINT_URL.replace('http', 'ws') + '/system/ws/';
    const staticSystemUrl = API_ENDPOINT_URL + '/system/static/';
    const webSocket = useRef<WebSocket | null>(null);

    const amountOfChartValues = 60;
    const [cpuChartData] = useState<number[]>(Array(amountOfChartValues).fill(0));
    const [ramChartData] = useState<number[]>(Array(amountOfChartValues).fill(0));
    const [diskChartData] = useState<number[]>(Array(amountOfChartValues).fill(0));
    const [chartLabelX] = useState<string[]>([...Array(amountOfChartValues)].map((value, index) => {
        return amountOfChartValues - index + " seconds ago";
    }));

    const [cpuBasics, setCpuBasics] = useState<BasicSystemInformation>({
        value: "", percentage: 0,
    });
    const [ramBasics, setRamBasics] = useState<BasicSystemInformation>({
        value: "", percentage: 0,
    });
    const [diskBasics, setDiskBasics] = useState<BasicSystemInformation>({
        value: "", percentage: 0,
    });
    const [hostBasics, setHostBasics] = useState<BasicHostInformation>({
        uptime: {days: 0, hours: "", minutes: "", seconds: "",},
    });
    const [staticSystem, setStaticSystem] = useState<StaticInformation>({
        disk: {readable: "", value: 0, unit: 0,},
        host: {
            server_name: "",
            operating_system: "",
            platform: "",
            platform_version: "",
            total_swap: "",
            partitions: 0
        },
        ram: {readable: "", value: 0, unit: 0,},
        processor: {name: "", speed: "", threads: 0, architecture: "",},
    });

    useEffect(() => {
        const updateCharts = (message: LiveInformation) => {
            cpuChartData.shift()
            cpuChartData.push(message.cpu.percentage)
            ramChartData.shift()
            ramChartData.push(message.ram.percentage)
            diskChartData.shift()
            diskChartData.push(message.disk.percentage)
        };
        const updateLiveSystemInformation = (message: LiveInformation) => {
            setCpuBasics(message.cpu);
            setRamBasics(message.ram);
            setDiskBasics(message.disk);
            setHostBasics(message.host);
        };
        const getStaticSystem = () => {
            axios.get(staticSystemUrl)
                .then((res) => {
                    const staticInformation: StaticInformation = res.data as StaticInformation;
                    setStaticSystem(staticInformation);
                });
        };
        const initWebSocketHandler = () => {
            if (webSocket.current) {
                webSocket.current.onclose = () => {
                    setTimeout(function () {
                        openWebSocket();
                    }, 2000);
                };
                webSocket.current.onmessage = (evt) => {
                    const message: LiveInformation = JSON.parse(evt.data)
                    updateLiveSystemInformation(message);
                    updateCharts(message)
                }
                webSocket.current.onclose = () => {
                    webSocket.current = null;
                }
            }
        };
        const openWebSocket = () => {
            webSocket.current = new WebSocket(webSocketUrl);
        };
        getStaticSystem();
        openWebSocket();
        initWebSocketHandler();
    }, [staticSystemUrl, cpuChartData, diskChartData, ramChartData, webSocketUrl])

    return (
        <div className={"row vh-100 align-items-center"}>
            <div className={"row g-0 m-0 pb-3"}>
                <CardWrapper element={
                    <OverviewCard
                        staticInformation={staticSystem}
                        basicInformation={hostBasics}
                        extraInformation={{
                            color: "info", icon: faServer,
                        }}
                    />
                }/>
                <CardWrapper element={
                    <LiveCard
                        staticInfo={{
                            name: "CPU",
                            info: staticSystem.processor.threads + " threads"
                        }}
                        basicInformation={cpuBasics}
                        extraInformation={{
                            color: "primary", icon: faMicrochip, chartData: cpuChartData, chartLabelX: chartLabelX,
                        }}
                    />
                }/>
                <CardWrapper element={
                    <LiveCard
                        staticInfo={{
                            name: "Memory",
                            total: staticSystem.ram.readable,
                            info: staticSystem.host.total_swap + " swap"
                        }}
                        basicInformation={ramBasics}
                        extraInformation={{
                            color: "secondary", icon: faMemory, chartData: ramChartData, chartLabelX: chartLabelX,
                        }}
                    />
                }/>
                <CardWrapper element={
                    <LiveCard
                        staticInfo={{
                            name: "Disk",
                            total: staticSystem.disk.readable,
                            info: staticSystem.host.partitions + " partitions"
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
