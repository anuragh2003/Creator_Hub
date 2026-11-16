import { ConversationModel } from "./conversation.model.js";
import { MessageModel } from "./message.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const messageService = {
  async getConversations(userId: string) {
    return ConversationModel.find({ participants: userId })
      .populate("participants", "username displayName avatarUrl")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
  },

  async getOrCreateConversation(userId1: string, userId2: string) {
    let conversation = await ConversationModel.findOne({
      participants: { $all: [userId1, userId2], $size: 2 },
    });
    if (!conversation) {
      conversation = await ConversationModel.create({ participants: [userId1, userId2] });
    }
    return conversation;
  },

  async sendMessage(senderId: string, conversationId: string, content: string) {
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) throw ApiError.notFound("Conversation not found");

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === senderId
    );
    if (!isParticipant) throw ApiError.forbidden("You are not a participant in this conversation");

    const message = await MessageModel.create({
      conversation: conversationId,
      sender: senderId,
      content,
    });

    await ConversationModel.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      updatedAt: new Date(),
    });

    return message;
  },

  async getMessages(conversationId: string, page = 1, limit = 50) {
    const [messages, total] = await Promise.all([
      MessageModel.find({ conversation: conversationId })
        .populate("sender", "username displayName avatarUrl")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      MessageModel.countDocuments({ conversation: conversationId }),
    ]);
    return { messages: messages.reverse(), total, page, limit };
  },
};
