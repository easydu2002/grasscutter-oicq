import { getOnlinePlayer } from "../src/api/opencommand-api";
import { post } from "../src/util/request-util";

post('/opencommand/api', {
    'action': 'ping'
})

getOnlinePlayer().then(console.log).catch(console.log)