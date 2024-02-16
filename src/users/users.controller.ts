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
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({
		summary: "Create a new user",
	})
	@ApiResponse({
		status: 201,
		description: "The user has been successfully created.",
		schema: {
			example: {
				username: "aaa",
				email: "mail@mail.com",
			},
		},
	})
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@ApiOperation({
		summary: "Retrive list of users",
	})
	@ApiResponse({
		description: "List of available users.",
		status: 200,
		schema: {
			example: [
				{
					username: "aaa",
					email: "mail@mail.com",
				},
				{
					username: "bbbb",
					email: "mail@mul.com",
				},
			],
		},
	})
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@ApiOperation({
		summary: "Retrive user by id",
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				username: "aaa",
				email: "mail@mail.com",
			},
		},
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(id);
	}

	@ApiOperation({
		summary: "Update user by id",
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				username: "aaa",
				email: "mail@mail.com",
			},
		},
	})
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@ApiOperation({
		summary: "Remove user by id",
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
		this.usersService.remove(id);
		return { status: "ok" };
	}
}
