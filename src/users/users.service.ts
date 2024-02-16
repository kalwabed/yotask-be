import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { hash } from 'argon2'
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async create(data: CreateUserDto) {
		const createdUser = await this.userModel.create({
			...data,
			password: await hash(data.password)
		});
		return createdUser;
	}

	async findAll() {
		return await this.userModel.find({}, 'username email').exec()
	}

	async findOne(id: string) {
		try {
			return await this.userModel.findById(id);
		} catch (err) {
			throw new NotFoundException("User is not found!");
		}
	}

	async update(id: string, data: UpdateUserDto) {
		try {
			const user = await this.userModel.updateOne({ _id: id }, data).exec();
			return user;
		} catch (err) {
			throw new BadRequestException("Cannot update user!");
		}
	}

	async remove(id: string) {
		try {
			await this.userModel.findByIdAndDelete(id);
		} catch (err) {
			throw new BadRequestException("User is already deleted!");
		}
	}

	async findByUsername(username: string) {
		try {
			return await this.userModel.findOne({ username });
		} catch (err) {
			throw new BadRequestException("User is not found!");
		}
	}
}
