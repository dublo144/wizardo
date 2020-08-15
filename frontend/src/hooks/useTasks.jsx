import React from 'react';
import { apiUtils } from '../helpers/apiUtils';
import { gqlQueries } from '../helpers/graphqlQueries';
import { useAuthState } from '../context/AuthContext';

const useTasks = (selectedProject) => {
  const [tasks, setTasks] = React.useState([]);
  const { userId } = useAuthState();

  React.useEffect(() => {
    const fetchTasks = async () => {
      let opts = apiUtils.makeOpts({
        query: gqlQueries.GET_TASKS(userId, selectedProject)
      });
      const data = await apiUtils.fetchData(opts);
      setTasks(data.tasks);
    };
    fetchTasks();
  }, []);
  return tasks;
};

export default useTasks;
