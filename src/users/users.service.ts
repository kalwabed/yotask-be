import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
			const user = await this.userModel.findById(id)
			return user
		} catch(err) {
			throw new NotFoundException("User is not found!")
		}
	}

	async update(id: string, data: UpdateUserDto) {
		try {
			const user = await this.userModel.updateOne({ _id: id }, data).exec()
			return user
		} catch(err) {
			throw new BadRequestException("Cannot update user!")
		}
	}

	async remove(id: string) {
		try {
			await this.userModel.findByIdAndDelete(id)
		} catch(err) {
			throw new BadRequestException("User is already deleted!")
		}
	}
}
