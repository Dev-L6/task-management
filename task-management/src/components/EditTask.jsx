import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { editTask } from "../features/taskSlice";

const EditTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, error, loading } = useSelector((state) => state.tasks);
  const task = tasks.find((task) => task.id === Number(taskId));
  

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [status, setStatus] = useState(task?.status || "");



  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setStatus(task.status);
    }
  }, [task]);

  if (!task) {
    return <p>Task not found</p>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      title,
      description,
      dueDate,
      status,
    };
    dispatch(editTask(updatedTask));
    navigate("/");
    // setTitle("");
    // setDescription("");
    // setDueDate("");
    // setStatus("To Do");
  };

  if (error) {
    return <p>Error:{error}</p>;
  }

  return (
    <form className="form-control " onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div>
          <label className="flex items-center gap-2 mb-2">Enter Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2">
            Enter Description
          </label>
          <textarea
            type="text"
            className="input input-bordered w-full"
            placeholder="Description"
            rows={10}
            cols={23}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2">
            Enter Description
          </label>
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="To Do">To Do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="pt-3">
          <label className="flex items-center gap-2 mb-2">Enter Due Date</label>
          <input
            type="date"
            className="w-full rounded-2xl input input-bordered"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner text-secondary"></span>
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditTask;
