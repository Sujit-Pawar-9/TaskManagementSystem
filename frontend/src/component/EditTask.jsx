import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../service/TaskApiService";
import "../css/EditTask.css";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(taskId);
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
      
      navigate("/history"); // Navigate back to the task list after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-task-container">
      <h2 className="edit-task-heading">Edit Task</h2>
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Task title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title || ""}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description || ""}
            onChange={handleInputChange}
            className="form-textarea"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate || ""}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
