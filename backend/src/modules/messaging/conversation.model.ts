import mongoose, { Schema } from "mongoose";

export interface IConversation {
  _id: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true, versionKey: false }
);

conversationSchema.index({ participants: 1 });

export const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);
