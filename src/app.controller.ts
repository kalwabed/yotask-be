import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly authService: AuthService,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@ApiOperation({
		summary: "User login",
	})
	@ApiBody({
		schema: {
			example: {
				username: "111",
				password: "xxxx",
			},
		},
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				access_token: "xxx",
			},
		},
	})
	@UseGuards(LocalAuthGuard)
	@Post("auth/login")
	async login(@Request() req) {
		return this.authService.login(req.user._doc);
	}

	@ApiOperation({
		summary: "User signup",
	})
	@ApiBody({
		schema: {
			example: {
				username: "111",
				email: "nomain@main.com",
				password: "xxxx",
			},
		},
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				access_token: "xxx",
			},
		},
	})
	@Post("auth/signup")
	async register(
		@Body() data: { username: string; email: string; password: string },
	) {
		return this.authService.register(data);
	}
}
