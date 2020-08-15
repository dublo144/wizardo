const loginQuery = (email, password) => `
    {
      login(email: "${email}", password: "${password}") {
        userId
        username
        token
      }
    }
  `;

const setTaskCompleted = (taskId, completed) => `
  {
    mutation {
      setTaskCompleted(taskId: "${taskId}", completed: ${completed}) {
        title
        completed
      }
    }
  }
`;

const getTasks = (userId, deadline) => {
  return `
    {
      tasks(userId: "5f33ba40450f648ba246c749", deadline: "2020-08-13T22:21:12.357+00:00") {
        _id
        title
        description
        deadline
        project {
          name
        }
      }
    }
  `;
};

export const gqlQueries = {
  LOGIN: loginQuery,
  SET_TASK_COMPLETED: setTaskCompleted,
  GET_TASKS: getTasks
};
