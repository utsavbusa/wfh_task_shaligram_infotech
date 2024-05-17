import { HealthController, ModuleController, PermissionController, RoleController, UserController } from "@controller";
import { Container } from "inversify";
import { Types } from "./types";
import { ResponseMiddleware,RoleMiddleware,AuthMiddleware } from "@middleware";
import { ModuleService, PermissionService, RoleService, UserService } from "@services";

const container = new Container();
container.bind<HealthController>(Types.HealthController).to(HealthController)
container.bind<ResponseMiddleware>(Types.ResponseMiddleware).to(ResponseMiddleware)
container.bind<ModuleController>(Types.ModuleController).to(ModuleController)
container.bind<ModuleService>(Types.ModuleService).to(ModuleService)
container.bind<PermissionController>(Types.PermissionController).to(PermissionController)
container.bind<PermissionService>(Types.PermissionService).to(PermissionService)
container.bind<RoleController>(Types.RoleController).to(RoleController)
container.bind<RoleService>(Types.RoleService).to(RoleService)
container.bind<UserController>(Types.UserController).to(UserController)
container.bind<UserService>(Types.UserService).to(UserService)
container.bind<RoleMiddleware>(Types.RoleMiddleware).to(RoleMiddleware)
container.bind<AuthMiddleware>(Types.AuthMiddleware).to(AuthMiddleware)

export {container}