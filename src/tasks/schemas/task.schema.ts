import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as mSchema } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
	@Prop()
	title: string;

	@Prop()
	desc: string;

	@Prop()
	priority: boolean;

	@Prop()
	status: "pending" | "completed";

	@Prop({ ref: "User" })
	user: mSchema.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
