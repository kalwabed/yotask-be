import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
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
	@UseGuards(LocalAuthGuard)
	@Post("auth/login")
	async login(@Request() req) {
		console.log(req.user);
		return this.authService.login(req.user._doc);
	}
}
