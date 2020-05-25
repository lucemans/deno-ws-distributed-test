import { Client } from 'https://denopkg.com/jdiamond/MQTT.ts/mod.ts';
import { broascast } from "./chat.ts";

let client: Client;
export async function startMQTTServer() {
    client = new Client({ url: 'mqtt://mqtt.mqtt.svc.cluster.local' });
    await client.connect();
    await client.subscribe('#');

    const decoder = new TextDecoder();
    client.on('message', (topic: any, payload: any) => {
        console.log(topic, decoder.decode(payload));
        broascast(decoder.decode(payload));
    });
}

export async function msgReceived(s: string) {
    client.publish('luc/msg', s);
}