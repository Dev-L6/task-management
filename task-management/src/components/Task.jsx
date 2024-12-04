import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Pencil, Check, Search, Info } from "lucide-react";
import { fetchTodo, setFilter } from "../features/taskSlice";
import { useNavigate } from "react-router-dom";
import { deleteTask, markAsDone, searchTask, updateTaskOrder } from "../features/taskSlice";
import { Reorder } from "framer-motion";
const Task = () => {
  const { tasks, error, filter, search } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [filterTasks, setFilterTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTodo());
    }
    setFilterTasks(tasks);
  }, [dispatch, tasks]);

  const confirmDelete = (task) => {
    setTaskToDelete(task); 
    document.getElementById("my_modal_1").showModal(); 
  };

  const handleDelete = () => {
    
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id)); 
      setShowModal(false);
    }
    
   
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "All") {
        return true;
      }
      if (filter === "To Do") {
        return task.status === "To Do";
      }
      if (filter === "Done") {
        return task.status === "Done";
      }
      if (filter === "Overdue") {
        const currentDate = new Date();
        const dueDate = new Date(task.dueDate);
        return dueDate < currentDate && task.status !== "Done";
      }
      return false;
    })
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleMarkAsDone = (id) => {
    dispatch(markAsDone(id));
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    dispatch(searchTask(searchInput));
    setSearchInput("");
  };

  const handleReorder = (newOrder)=>{
    setFilterTasks(newOrder);
    dispatch(updateTaskOrder(newOrder));
  }

  const getFormatedDate = () => {
    const currentDate = new Date(Date.now());
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  };



  if (error) {
    return <p>Error:{error}</p>;
  }
  console.log("Tasks in Task component: ", tasks);

  return (
    <div className="p-10  min-h-screen">
      <div className="container flex flex-col items-center justify-center mx-auto">
        <h1 className="text-3xl font-bold p-3 mb-5">Tasks</h1>

        <div className="flex justify-between w-full max-w-4xl gap-4 mb-5">
         
          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              className="input input-bordered w-full p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search using task title"
              value={searchInput}
              onChange={handleSearch}
              required
            />
            <button
              className="btn btn-primary px-4 py-2 rounded-md flex items-center gap-2"
              onClick={handleSearchClick}
            >
              <Search />
              Search
            </button>
          </div>

          
          <select
            className="select select-bordered px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFilter}
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="Done">Done</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        
        <ul className="w-full max-w-4xl">
        <Reorder.Group axis="y" values={filterTasks} onReorder={handleReorder}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Reorder.Item key={task.id} value={task}  className="p-4  rounded-lg shadow-md cursor-grab"
              whileDrag={{ scale: 1.05 }}
            >
              <li key={task.id} className="mb-4">
                <div className="rounded-xl border border-gray-800 shadow-md p-5">
                  <div className={` p-5 rounded-xl`}>
                    <div className="flex justify-between items-center mb-3">
                      <h2
                        className={`text-xl font-bold mb-32 ${
                          task.status === "Done"
                            ? "line-through text-gray-300"
                            : "text-gray-400"
                        }`}
                      >
                        {task.title}
                      </h2>
                      <button
                        onClick={() => navigate(`/details/${task.id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Info />
                      </button>
                    </div>

                    {task.description && (
                      <p
                        className={`text-lg mb-3 ${
                          task.status === "Done"
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-col items-end mb-3">
                      <p className="text-sm text-blue-500">
                        Due Date: {task.dueDate || "Not Set"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Current Date: {getFormatedDate()}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          task.status === "Done"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        Status: {task.status}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center justify-end">
                      <button
                        className="btn btn-primary text-white  rounded-md flex items-center"
                        onClick={() => navigate(`/edit/${task.id}`)}
                      >
                        <Pencil />
                      </button>
                     <>
                     <button
                        className="btn btn-error text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center"
                        onClick={() => confirmDelete(task)}
                      >
                        <Trash2 />
                      </button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure you want to delete <span className="text-red-500">{`"${taskToDelete?.title}"`}?</span> </h3>
    <div className="modal-action">
      <form method="dialog">
        <div className="flex gap-4">
      <button className='btn btn-primary'>Cancel</button>
      <button className='btn btn-error'   onClick={handleDelete}>Delete</button>
      </div>

      </form>
    </div>
  </div>
</dialog> </>
                      <button
                        className={`btn ${
                          task.status === "Done"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-500 hover:bg-gray-600"
                        } text-white rounded-md flex items-center`}
                        onClick={() => handleMarkAsDone(task.id)}
                      >
                        {task.status === "Done" ? <Check /> : "Mark as Done"}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              </Reorder.Item>
              
            ))
          ) : (
            <p className="text-2xl mt-10 text-gray-500 text-center">
              Sorry, No tasks found!
            </p>
            
          )}
             </Reorder.Group>
        </ul>
      </div>
    </div>
  );
};

export default Task;
