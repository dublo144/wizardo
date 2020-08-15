const TaskModel = require('../../models/task');
const UserModel = require('../../models/user');
const ProjectModel = require('../../models/project');
const { dateToString } = require('../../helpers/date');

const tasks = async (taskIds) => {
  try {
    const tasks = await TaskModel.find({ _id: { $in: taskIds } });
    return tasks.map(transformTask);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const project = async (projectId) => {
  try {
    const project = await ProjectModel.findById(projectId);
    return transformProject(project);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const projects = async (projectIds) => {
  try {
    const projects = await ProjectModel.find({ _id: { $in: projectIds } });
    return projects.map((project) => transformProject(project));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const user = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      projects: projects.bind(this, user._doc.projects)
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const transformProject = (project) => {
  return {
    ...project._doc,
    user: user.bind(this, project.user),
    tasks: tasks.bind(this, project.tasks)
  };
};

const transformTask = (task) => {
  return {
    ...task._doc,
    created: dateToString(task._doc.created),
    deadline: dateToString(task._doc.deadline),
    project: project.bind(this, task.project)
  };
};

exports.transformProject = transformProject;
exports.transformTask = transformTask;
