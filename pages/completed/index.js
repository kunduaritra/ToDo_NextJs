import React, { Fragment } from "react";

const CompletedTaskPage = () => {
  return (
    <Fragment>
      <div className="ml-10 mt-4 font-bold italic">Task Details</div>
      <div className="grid grid-cols-3 gap-4 my-4 ml-10">
        <div className="font-bold text-3xl">Completed Task</div>
        <div className="col-span-2">
          <ul className="mt-4 space-y-2">
            {/* {props.taskData.map((task, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`task-${index}`}
                  name="task"
                  value={task.task}
                  className="mr-2 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`task-${index}`} className="text-lg">
                  {task.date} - {task.task}
                </label>
                <MdDelete className="ml-4" onClick={deleteTaskHandler} />
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default CompletedTaskPage;
