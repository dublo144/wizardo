import React from 'react';
import Checkbox from './Checkbox.jsx';
import useTasks from '../hooks/useTasks.jsx';
import useFetch from '../hooks/useFetch.jsx';

const Tasks = () => {
  const tasks = useFetch();
  console.log(tasks);

  let projectName = '';

  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>

      <ul className='task-list'>
        {tasks.map((task) => (
          <li key={task._id}>
            <Checkbox id={task.id} />
            <span>{task.title}</span>
            <span>{task.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
