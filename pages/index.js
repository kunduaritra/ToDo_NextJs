import TaskList from "../components/task/TaskList";

const DUMMY_TASKDATA = [
  {
    date: "10-04-24",
    task: "Gym",
  },
  {
    date: "09-04-24",
    task: "React",
  },
  {
    date: "07-04-24",
    task: "JavaScript",
  },
];

export default function Home(props) {
  return <TaskList taskData={props.taskData} />;
}

export const getServerSideProps = () => {
  return {
    props: {
      taskData: DUMMY_TASKDATA,
    },
  };
};
