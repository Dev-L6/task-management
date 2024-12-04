import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";


const TaskDetails = () => {
  const { taskId } = useParams();
  const { tasks, error, loading } = useSelector((state) => state.tasks);
  const task = tasks.find((task) => task.id === Number(taskId));

  console.log(task.id);
  console.log(taskId);

  if (error) {
    return <p>Error:{error}</p>;
  }

  if (!task) {
    return <p>Sorry! No task found!</p>;
  }

  if(loading){
    return  <span className="loading loading-spinner text-secondary"></span>
  }

  return (
    <>
      <div className="flex flex-col justify-center items-start p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2
          className={`text-2xl font-bold ${
            task.status === "Done" ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {task.title}
        </h2>

        {task.description && (
          <p
            className={`text-lg font-medium mb-3 ${
              task.status === "Done"
                ? "line-through text-gray-500"
                : "text-gray-300"
            }`}
          >
            {task.description}
          </p>
        )}

        <p className="mt-3 text-sm text-blue-400">
          <span className="font-semibold">Due Date:</span>{" "}
          {task.dueDate || "Not Set"}
        </p>

        <p
          className={`text-sm font-semibold mt-1 ${
            task.status === "Done" ? "text-green-400" : "text-red-400"
          }`}
        >
          Status: {task.status}
        </p>
      </div>
      <Link className="flex justify-center items-center mx-auto btn mt-5" to='/'>Back</Link>
    </>
  );
};

export default TaskDetails;
