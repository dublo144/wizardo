import React from 'react';
import { apiUtils } from '../helpers/apiUtils';
import { gqlQueries } from '../helpers/graphqlQueries';

const Checkbox = (props) => {
  const completeTask = () => {
    const opts = apiUtils.makeOpts(
      gqlQueries.SET_TASK_COMPLETED(props.taskId, true)
    );
    apiUtils.fetchData(opts);
  };
  return (
    <div
      className='checkbox-holder'
      data-testid='checkbox-action'
      onClick={() => completeTask()}
    >
      <span className='checkbox' />
    </div>
  );
};

export default Checkbox;
