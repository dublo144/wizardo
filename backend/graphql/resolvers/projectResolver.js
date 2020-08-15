const ProjectModel = require('../../models/project');
const UserModel = require('../../models/user');
const { transformProject } = require('./merge');
const { findByIdAndUpdate } = require('../../models/user');

module.exports = {
  projects: async ({ userId }) => {
    try {
      const projects = await ProjectModel.find().populate();
      const filteredProjects = projects.filter(
        (project) => project.user.id !== userId
      );
      return filteredProjects.map(transformProject);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  createProject: async (args, req) => {
    const project = new ProjectModel({
      name: args.projectInput.name,
      description: args.projectInput.description,
      user: '5f33ba40450f648ba246c749' // req.userId
    });
    try {
      const result = await project.save();
      const savedProject = transformProject(result);
      const user = await UserModel.findById('5f33ba40450f648ba246c749'); //req.userId;
      if (!user) {
        console.log('User not found');
        throw new Error('User not found');
      }
      user.projects.push(savedProject);
      await user.save();
      return { ...savedProject, _id: project.id };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  updateProject: async ({ updateProjectInput }) => {
    try {
      return ProjectModel.findByIdAndUpdate(
        updateProjectInput.projectId,
        { ...updateProjectInput },
        { new: true },
        (err, doc) => doc
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  deleteProject: async ({ projectId }) => {
    const project = await ProjectModel.findById(projectId);
    await ProjectModel.findByIdAndDelete(projectId);
    return project;
  }
};
