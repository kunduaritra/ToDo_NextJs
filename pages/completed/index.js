import { MongoClient } from "mongodb";
import React, { Fragment } from "react";
import { MdDelete } from "react-icons/md";

const CompletedTaskPage = (props) => {
  return (
    <Fragment>
      <div className="ml-10 mt-4 font-bold italic">Task Details</div>
      <div className="grid grid-cols-3 gap-4 my-4 ml-10">
        <div className="font-bold text-3xl">Completed Task</div>
        <div className="col-span-2">
          <ul className="mt-4 space-y-2">
            {props.taskData.map(
              (task, index) =>
                task.completeStatus && (
                  <li key={index} className="flex items-center line-through">
                    {task.date} - {task.task}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://kunduaritra7:5PEC4YLPKqVS5qkD@cluster0.it4emu0.mongodb.net/todoTask?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const taskCollections = db.collection("todoTask");
  const taskDatabase = await taskCollections.find().toArray();
  return {
    props: {
      taskData: taskDatabase.map((val) => ({
        id: val._id.toString(),
        date: val.date,
        task: val.task,
        completeStatus: val.completeStatus,
      })),
    },
  };
};

export default CompletedTaskPage;
