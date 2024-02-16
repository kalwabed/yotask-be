import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
	@ApiProperty()
	title: string;

	@ApiProperty()
	desc: string;

	@ApiProperty()
	priority: boolean;

	@ApiProperty()
	status: "pending" | "completed";

	@ApiProperty()
	user: string;
}
