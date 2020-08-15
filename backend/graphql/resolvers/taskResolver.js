const TaskModel = require('../../models/task');
const ProjectModel = require('../../models/project');
const { transformTask, transformProject } = require('./merge');

module.exports = {
  tasks: async ({ userId, deadline }) => {
    console.log();
    try {
      const tasks = await TaskModel.find({
        ...(deadline && { deadline: deadline }),
        userId: userId
      });
      return tasks.map(transformTask);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  createTask: async (args) => {
    const task = new TaskModel({
      userId: args.taskInput.userId,
      title: args.taskInput.title,
      description: args.taskInput.description,
      created: new Date(),
      deadline: args.taskInput.deadline && new Date(args.taskInput.deadline),
      completed: false,
      project: args.taskInput.projectId
    });
    try {
      const result = await task.save();
      const savedTask = transformTask(result);
      const project = await ProjectModel.findById(args.taskInput.projectId);
      if (!project) {
        console.log('Project not found');
        throw new Error('Project not found');
      }
      project.tasks.push(savedTask);
      await project.save();
      return { ...savedTask, _id: task.id };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  updateTask: async ({ updateTaskInput }) => {
    try {
      return TaskModel.findByIdAndUpdate(
        updateTaskInput.taskId,
        { ...updateTaskInput },
        { new: true },
        (err, doc) => doc
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  setTaskCompleted: async ({ taskId, completed }) => {
    try {
      const task = await TaskModel.findById(taskId);
      task.completed = completed;
      await task.save();
      return transformTask(task);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  deleteTask: async ({ taskId }) => {
    try {
      const task = await TaskModel.findById(taskId).populate('project');
      const project = transformProject(task.project);
      await TaskModel.findByIdAndDelete(taskId);
      return project;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
