import { ProjectModel } from "./project.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const collaborationService = {
  async createProject(userId: string, data: { title: string; description?: string; tags?: string[] }) {
    return ProjectModel.create({ ...data, owner: userId, members: [userId] });
  },

  async getProjects(page = 1, limit = 20) {
    const [projects, total] = await Promise.all([
      ProjectModel.find({ status: "open" })
        .populate("owner", "username displayName avatarUrl")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      ProjectModel.countDocuments({ status: "open" }),
    ]);
    return { projects, total, page, limit };
  },

  async getProject(projectId: string) {
    const project = await ProjectModel.findById(projectId).populate(
      "owner members",
      "username displayName avatarUrl"
    );
    if (!project) throw ApiError.notFound("Project not found");
    return project;
  },
};
