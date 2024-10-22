
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(async() => {
    mainModule();
})();

async function mainModule(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB
    });

    // const prisma = new PrismaClient
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'LOW',
    //         message: 'Test message',
    //         origin: 'localhost'
    //     }
    // });
    // console.log(newLog);
    
    // const newLog = await LogModel.create({
    //     level: 'low',
    //     message: 'Test message',
    //     origin: 'localhost'
    // });
    // await newLog.save();

    Server.start();
    console.log(envs);
}