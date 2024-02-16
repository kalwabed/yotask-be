import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@ApiOperation({
		summary: "Add new task",
	})
	@ApiResponse({
		status: 201,
		description: "The task has been successfully created.",
		schema: {
			example: {
				_id: '65cf2b1bc443435778f302aa',
				title: "aaa",
				desc: "haloo",
				priority: true,
				status: "pending",
			},
		},
	})
	@Post()
	create(@Body() createTaskDto: CreateTaskDto) {
		return this.tasksService.create(createTaskDto);
	}

	@ApiOperation({
		summary: "Retrive list of tasks",
	})
	@ApiResponse({
		description: "List of available tasks.",
		status: 200,
		schema: {
			example: [
				{
					_id: '65cf2b1bc443435778f302aa',
					title: "aaa",
					desc: "haloo",
					priority: true,
					status: "pending",
					user: {
						_id: '65cf2b1bc443435778f302aa',
						username: 'abc'
					}
				},
			],
		},
	})
	@Get()
	findAll() {
		return this.tasksService.findAll();
	}

	@ApiOperation({
		summary: "Retrive task by id",
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				_id: '65cf2b1bc443435778f302aa',
				username: "aaa",
				email: "mail@mail.com",
			},
		},
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.tasksService.findOne(id);
	}

	@ApiOperation({
		summary: "Update task by id",
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				status: "ok",
			},
		},
	})
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
		this.tasksService.update(id, updateTaskDto);
		return { status: "ok" };
	}

	@ApiOperation({
		summary: "Remove task by id",
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				status: "ok",
			},
		},
	})
	@Delete(":id")
	remove(@Param("id") id: string) {
		this.tasksService.remove(id);
		return { status: "ok" };
	}
}
