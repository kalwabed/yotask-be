import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
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
			if (user && user.password === password) {
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
}
