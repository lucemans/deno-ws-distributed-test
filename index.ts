import { listenAndServe, ServerRequest } from 'https://deno.land/std/http/server.ts';
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import { joinUser } from './chat.ts';
import { exists } from './lib.ts';
import { startMQTTServer } from './mqtt.ts';

startMQTTServer();

listenAndServe({port: 8000}, async (req: ServerRequest) => {
    if (acceptable(req)) {
        acceptWebSocket({
            conn: req.conn,
            bufReader: req.r,
            bufWriter: req.w,
            headers: req.headers
        }).then(joinUser);
    } else {
        try {
            let r = Deno.readTextFileSync("." + req.url);
            if (r == "")
                r = Deno.readTextFileSync("./index.html").replace('{{hostname}}', Deno.hostname());
            req.respond({body: r});
        } catch (error) {
            req.respond({status: 404})
        }
    }
});