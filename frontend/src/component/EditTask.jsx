import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { retrieveTaskById, updateTask } from "../service/TaskApiService";
import '../css/tasks.css'
const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await retrieveTaskById(taskId);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateTask(task, taskId);
      navigate("/tasks"); // Navigate back to the task list after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task">Task:</label>
          <input
            type="text"
            id="task"
            name="task"
            value={task.task || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <br></br>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
