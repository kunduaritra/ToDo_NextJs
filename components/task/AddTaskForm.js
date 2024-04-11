import { useRef } from "react";

const AddTaskForm = (props) => {
  const dateInputRef = useRef();
  const taskInputRef = useRef();

  const addTaskHandler = (e) => {
    e.preventDefault();
    const dateInput = dateInputRef.current.value;
    const taskInput = taskInputRef.current.value;
    if (dateInput && taskInput) {
      const taskData = {
        date: dateInput,
        task: taskInput,
      };
      console.log(taskInput);
      props.addTask(taskData);
    }
  };
  return (
    <div className="">
      <form onSubmit={addTaskHandler}>
        <label htmlFor="date" className="relative mt-4 text-lg">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="border rounded-md px-3 py-2 mt-1"
          ref={dateInputRef}
        />

        <label htmlFor="task" className="block mt-4 text-lg">
          Enter Task
        </label>
        <input
          type="text"
          id="task"
          className="border rounded-md px-3 py-2 mt-1"
          ref={taskInputRef}
        />

        <button className="bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
