
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

(async() => {
    mainModule();
})();

function mainModule(){
    Server.start();
    console.log(envs);
}