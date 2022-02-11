const url = window.origin.replace("http", "ws") + '/system/ws/';
const liveOutput = document.getElementById('liveOutput');
let ws, staticSystem, liveSystem;

window.addEventListener('load', function () {
    onLoad().then(() => {
        initWebsocket(url)
    });
})

async function onLoad() {
    await axios.get(window.location.pathname + "system/static/", {
        params: {
            "values": {"cpu": "", "ram": "", "disk": ""},
            "extras": {"operating_system": "", "processor_architecture": "", "running_processes": ""}
        }
    }).then(res => {
        staticSystem = res.data;
    }).catch(err => {
        return err;
    });
    await axios.get(window.location.pathname + "system/live/", {
        params: {
            "values": {"ram": "", "disk": ""},
            "percentage": {"cpu": "", "ram": "", "disk": ""}
        }
    }).then(res => {
        liveSystem = res.data;
    }).catch(err => {
        return err;
    });
}

function initWebsocket(url) {
    ws = new WebSocket(url);
    ws.onclose = () => {
        ws = null;
        setTimeout(function () {
            initWebsocket(url);
        }, 5000);
    };
    ws.onmessage = socketMessageListener;
}

const socketMessageListener = (e) => {
    liveOutput.innerHTML = "";
    liveSystem = JSON.parse(e.data);
    for (let type in liveSystem.percentage) {
        liveOutput.innerHTML += `<div>${liveSystem.percentage[type]}</div>`
    }
};
