import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { useState } from "react";
import { addTask } from "../features/taskSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To Do");
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.tasks);
  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000); 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id:generateRandomId(),
      title,
      description,
      dueDate,
      status,
    };
    dispatch(addTask(newTask));
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("To Do");
  };
  return (
    <>
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
            <label className="flex items-center gap-2 mb-2">
              Enter Due Date
            </label>
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
    </>
  );
};

export default AddTask;
