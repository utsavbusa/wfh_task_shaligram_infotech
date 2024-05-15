import { HealthController, ModuleController } from "@controller";
import { Container } from "inversify";
import { Types } from "./types";
import { ResponseMiddleware } from "@middleware";
import { ModuleService } from "@services";

const container = new Container();
container.bind<HealthController>(Types.HealthController).to(HealthController)
container.bind<ResponseMiddleware>(Types.ResponseMiddleware).to(ResponseMiddleware)
container.bind<ModuleController>(Types.ModuleController).to(ModuleController)
container.bind<ModuleService>(Types.ModuleService).to(ModuleService)
export {container}