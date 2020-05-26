import { MQTTLoopback } from 'https://raw.githubusercontent.com/lucemans/MQTTLoopback-deno/master/mod.ts';
import { broascast } from "./chat.ts";

let client: MQTTLoopback;
export async function startMQTTServer() {
    const inProd = (Deno.env.get("MQTT_PROD") == "yes");
    client = new MQTTLoopback(inProd, { url: 'mqtt://mqtt.mqtt.svc.cluster.local' });
    await client.connect();
    const decoder = new TextDecoder();
    await client.subscribe('novachat/message', (topic, payload) => {
        console.log('novachat/message', decoder.decode(payload));
        broascast(decoder.decode(payload));
    });
}

export async function msgReceived(s: string) {
    client.publish('novachat/message', s);
}