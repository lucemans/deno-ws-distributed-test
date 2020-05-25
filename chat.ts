import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { msgReceived } from "./mqtt.ts";

const users: WebSocket[] = [];

export async function joinUser(ws: WebSocket) {
    console.log('Hello ws');
    ws.send('Hey you are talking with ' + Deno.hostname());
    users.push(ws);

    for await (let data of ws) {
        console.log(data);
        msgReceived(data.toString());
        // broascast(data.toString());
    }
}

export function validSockets() {
    return users.filter((ws) => {
        return !ws.isClosed;
    });
}

export async function broascast(msg: string) {
    validSockets().forEach((ws) => {
        ws.send(msg);
    });
}