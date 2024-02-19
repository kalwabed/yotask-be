import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { Task, TaskSchema } from "./schemas/task.schema";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
		AuthModule,
	],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
