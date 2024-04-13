import { Fragment, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import AddTaskForm from "./AddTaskForm";

const TaskList = (props) => {
  const [isFormDisplay, setIsFormDisplay] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [task, setTask] = useState(props.taskData);
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const updatedTaskInputRef = useRef();
  const updatedTaskDateInputRef = useRef();

  const editTaskHandler = (task) => {
    setIsUpdating(true);
    updatedTaskInputRef.current = task.task;
    updatedTaskDateInputRef.current = task.date;
    setUpdateTaskId(task.id);
  };

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    const newTask = updatedTaskInputRef.current.value;
    const newDate = updatedTaskDateInputRef.current.value;
    const updateData = {
      id: updateTaskId,
      date: newDate,
      task: newTask,
      completeStatus: false,
    };
    const res = await fetch("/api/edit-task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    setIsUpdating(false);
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === updateTaskId
          ? { ...task, task: newTask, date: newDate }
          : task
      )
    );
  };

  const toggleButtonHandler = (e) => {
    e.preventDefault();
    setIsFormDisplay(true);
  };

  const addTaskHandler = (taskData) => {
    setIsFormDisplay(false);
    setTask((prevTask) => [...prevTask, taskData]);
  };

  const markedCompletedStatus = async (taskId) => {
    const res = await fetch("/api/update-task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId }),
    });
    if (res.ok) {
      setTask((prevTask) =>
        prevTask.map((task) =>
          task.id === taskId ? { ...task, completeStatus: true } : task
        )
      );
    } else {
      console.error("Failed to mark task as completed");
    }
  };

  return (
    <Fragment>
      <div className="ml-10 mt-4 font-bold italic">Task Details</div>
      <div className="grid grid-cols-3 gap-4 my-4 ml-10">
        <div className="font-bold text-3xl">Today</div>
        <div className="col-span-2">
          {isUpdating && (
            <form onSubmit={editSubmitHandler} className="mb-4">
              <label htmlFor="task" className="block mt-4 text-lg">
                Update Task
              </label>
              <input
                type="text"
                id="task"
                className="border rounded-md px-3 py-2 mt-1"
                ref={updatedTaskInputRef}
                defaultValue={updatedTaskInputRef.current}
              />
              <input
                type="date"
                id="task"
                className="border rounded-md px-3 py-2 mt-1"
                ref={updatedTaskDateInputRef}
                defaultValue={updatedTaskDateInputRef.current}
              />
              <button className="bg-green-500 text-white font-semibold px-4 py-2 mt-4 rounded-md hover:bg-green-800 focus:outline-none focus:bg-green-800">
                Update Task
              </button>
            </form>
          )}
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
            {task.map(
              (val, index) =>
                !val.completeStatus && (
                  <li key={val.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="task"
                      value={val.task}
                      onChange={() => markedCompletedStatus(val.id)}
                      className="mr-2 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`task-${index}`} className="text-lg">
                      {val.date} - {val.task}
                    </label>
                    <MdDelete
                      className="ml-4 cursor-pointer"
                      onClick={() => deleteTaskHandler(val)}
                    />
                    <BiEditAlt
                      className="ml-4 cursor-pointer"
                      onClick={() => editTaskHandler(val)}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskList;
