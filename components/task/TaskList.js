import { Fragment, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddTaskForm from "./AddTaskForm";

const TaskList = (props) => {
  const [isFormDisplay, setIsFormDisplay] = useState(false);
  const [task, setTask] = useState(props.taskData);

  const deleteTaskHandler = () => {
    console.log("task deleted");
  };

  const toggleButtonHandler = (e) => {
    e.preventDefault();
    setIsFormDisplay(true);
  };

  const addTaskHandler = (taskData) => {
    setIsFormDisplay(false);
    setTask([...task, taskData]);
  };
  return (
    <Fragment>
      <div className="ml-10 mt-4 font-bold italic">Task Details</div>
      <div className="grid grid-cols-3 gap-4 my-4 ml-10">
        <div className="font-bold text-3xl">Today</div>
        <div className="col-span-2">
          {!isFormDisplay && (
            <button
              className="inline-flex items-center gap-2"
              onClick={toggleButtonHandler}
            >
              <IoIosAddCircleOutline />
              Add Task
            </button>
          )}
          {isFormDisplay && <AddTaskForm addTask={addTaskHandler} />}
          <ul className="mt-4 space-y-2">
            {task.map((task, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  name="task"
                  value={task.task}
                  className="mr-2 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`task-${index}`} className="text-lg">
                  {task.date} - {task.task}
                </label>
                <MdDelete className="ml-4" onClick={deleteTaskHandler} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskList;
