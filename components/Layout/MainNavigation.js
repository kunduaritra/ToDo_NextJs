import Link from "next/link";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const MainNavigation = () => {
  return (
    <header className="bg-orange-800 flex p-4">
      <div className="text-2xl text-white font-bold">ToDo!</div>
      <nav className="ml-auto mr-8">
        <ul className="flex space-x-4 text-white">
          <li className="inline-flex items-center">
            <IoCheckmarkDoneSharp />
            <Link className="ml-2" href="/completed">
              Completed Task
            </Link>
          </li>
          <li className="inline-flex items-center">
            <MdOutlinePendingActions />
            <Link className="ml-2" href="/">
              Todays Task
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
