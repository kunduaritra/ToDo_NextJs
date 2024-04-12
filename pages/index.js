import TaskList from "../components/task/TaskList";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return <TaskList taskData={props.taskData} />;
}

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
