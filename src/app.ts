
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";

(async() => {
    mainModule();
})();

async function mainModule(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB
    });
    
    // const newLog = await LogModel.create({
    //     level: 'low',
    //     message: 'Test message',
    //     origin: 'localhost'
    // });
    // await newLog.save();

    Server.start();
    console.log(envs);
}