import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async create(data: CreateUserDto) {
		const createdUser = await this.userModel.create(data)
		return createdUser
	}

	async findAll() {
		return await this.userModel.find().exec()
	}

	async findOne(id: string) {
		try {
			const user = await this.userModel.findOne({ _id: id }).exec()
			return user
		} catch(err) {
			throw new NotFoundException("User is not found!")
		}
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
