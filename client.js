let ws;

window.addEventListener('DOMContentLoaded', () => {
    ws = new WebSocket(`wss://chat.emun.app/ws`);
    ws.addEventListener('open', onConnectionOpen);
    ws.addEventListener('message', onConnectionClose);
})

function onConnectionOpen() {
    console.log('ws open');

    ws.send('Hello Server');
}


function onConnectionClose(e) {
    console.log('msg', e);
}

window.hi = () => {
    ws.send('testing person');
}