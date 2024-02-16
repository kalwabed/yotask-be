import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as mSchema } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	@Prop()
	username: string;

	@Prop()
	email: string;

	@Prop()
	password: string;

	@Prop({ ref: "Task" })
	tasks: mSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
