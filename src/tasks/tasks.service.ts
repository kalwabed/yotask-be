import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./schemas/task.schema";

@Injectable()
export class TasksService {
	constructor(
		@InjectModel(Task.name) private readonly taskModel: Model<Task>,
	) {}

	async create(data: CreateTaskDto) {
		try {
			return await this.taskModel.create(data);
		} catch {
			throw new BadRequestException(
				"Something went wrong. Cannot create task!",
			);
		}
	}

	async findAll() {
		return await this.taskModel.find().populate("user", 'username').exec();
	}

	async findOne(id: string) {
		try {
			return await this.taskModel.findById(id);
		} catch {
			throw new NotFoundException("Task is not found!");
		}
	}

	async update(id: string, data: UpdateTaskDto) {
		try {
			return await this.taskModel.findOneAndUpdate({ _id: id }, data);
		} catch {
			throw new BadRequestException(
				"Something went wrong. Cannot update task!",
			);
		}
	}

	async remove(id: string) {
		try {
			await this.taskModel.findByIdAndDelete(id);
		} catch (err) {
			throw new BadRequestException("Task is already deleted!");
		}
	}
}
