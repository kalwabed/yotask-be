import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { Request as ExRequest } from "express";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
	constructor(
		private readonly tasksService: TasksService,
		private readonly authService: AuthService,
	) {}

	@ApiOperation({
		summary: "Add new task",
	})
	@ApiResponse({
		status: 201,
		description: "The task has been successfully created.",
		schema: {
			example: {
				_id: "65cf2b1bc443435778f302aa",
				title: "aaa",
				desc: "haloo",
				priority: true,
				status: "pending",
			},
		},
	})
	@Post()
	create(@Body() body: CreateTaskDto, @Request() req: ExRequest) {
		const [, token] = req.headers.authorization.split(" ");

		// sub is user id
		const jwt: { sub: string } = this.authService.decodeJwt(token);
		return this.tasksService.create({ ...body, user: jwt.sub });
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
					_id: "65cf2b1bc443435778f302aa",
					title: "aaa",
					desc: "haloo",
					priority: true,
					status: "pending",
					user: {
						_id: "65cf2b1bc443435778f302aa",
						username: "abc",
					},
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
				_id: "65cf2b1bc443435778f302aa",
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

	@ApiOperation({
		summary: "Retrive list of tasks by user",
	})
	@ApiResponse({
		description: "List of available tasks.",
		status: 200,
		schema: {
			example: [
				{
					_id: "65cf2b1bc443435778f302aa",
					title: "aaa",
					desc: "haloo",
					priority: true,
					status: "pending",
					user: {
						_id: "65cf2b1bc443435778f302aa",
						username: "abc",
					},
				},
			],
		},
	})
	@Get("user/:userId")
	findByUser(@Param("userId") userId: string) {
		return this.tasksService.findTasksByUser(userId);
	}
}
