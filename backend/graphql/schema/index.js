const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Task {
      _id: ID!
      userId: ID!
      title: String!
      description: String
      created: String!
      deadline: String
      completed: Boolean!
      project: Project!
    }

    type User {
      _id: ID!
      username: String!
      email: String!
      password: String
      projects: [Project!]
    }

    type Project {
      _id: ID!
      name: String!
      description: String
      user: User!
      tasks: [Task!]
    }

    type AuthData {
      username: String!
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }

    input TaskInput {
      userId: ID!
      title: String!
      description: String
      deadline: String
      projectId: String!
    }

    input UpdateTaskInput {
      taskId: ID!
      userId: ID
      title: String
      description: String
      deadline: String
      projectId: String
    }

    input UserInput {
      username: String!
      email: String!
      password: String!
    }

    input UpdateUserInput {
      userId: ID!
      username: String
      email: String
    }

    input ProjectInput {
      name: String!
      description: String
    }

    input UpdateProjectInput {
      projectId: ID!
      name: String
      description: String
    }

    type RootQuery {
      tasks(userId: ID!, deadline: String): [Task!]!
      projects(userId: ID): [Project!]!
      login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
      createTask(taskInput: TaskInput): Task!
      updateTask(updateTaskInput: UpdateTaskInput): Task!
      setTaskCompleted(taskId: ID!, completed: Boolean!): Task!
      deleteTask(taskId: ID!): Project!

      createProject(projectInput: ProjectInput): Project!
      updateProject(updateProjectInput: UpdateProjectInput): Project!
      deleteProject(projectId: ID!): Project!

      createUser(userInput: UserInput): User!
      updateUser(updateUserInput: UpdateUserInput): User!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
`);
