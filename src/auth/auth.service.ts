import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string) {
		try {
			const findUsername = await this.usersService.findByUsername(username);
			const user = await this.usersService.findOne(findUsername.id);
			const userPassword = await verify(user.password, password);
			if (user && userPassword) {
				const { password, ...result } = user;
				return result;
			}
			return null;
		} catch {
			throw new BadRequestException("Username is not found!");
		}
	}

	async login(user: { username: string; _id: string }) {
		const payload = { username: user.username, sub: user._id.toString() };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async register(data: { username: string; email: string; password: string }) {
		const existingUser = await this.usersService.findByUsername(data.username);

		if (existingUser) {
			throw new BadRequestException("Username is already registered!");
		}

		const user = await this.usersService.create(data);
		return await this.login({ username: user.username, _id: user.id });
	}

	decodeJwt(token: string) {
		if (!token) {
			return "";
		}

		return this.jwtService.decode(token);
	}
}
