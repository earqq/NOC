import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";


interface CheckServiceUseCase{

    execute(url: string): Promise<boolean>;
}


type SuccessCallback = (() => void | undefined);
type ErrorCallback = ((error: string) => void | undefined);
export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){}
    async execute(url: string): Promise<boolean> {

        try{
            const req = await fetch(url);
            if(!req.ok){
                console.error('Error en la petición');
                return false;
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Petición exitosa',
                origin: 'CheckService'
            });
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback();
            console.log('Petición exitosa');
            return true
        }
        catch(err){
            const errorMessage = `${err}`;
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin: 'CheckService'
            });
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
} 