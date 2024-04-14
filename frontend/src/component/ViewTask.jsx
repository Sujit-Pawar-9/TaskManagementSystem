import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../service/TaskApiService";
import "./viewTask.css"; 
const ViewTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(taskId);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
        // Optionally, handle the error, e.g., navigate to an error page
        // navigate("/error");
      }
    };

    fetchTask();
  }, [taskId, navigate]);

  if (!task) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className="view-task-container">
      <div className="view-task-content">
        <h2 className="view-task-title">Task Details</h2>
        <div className="view-task-details">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          {/* Add any other task details you want to display */}
        </div>
        <button className="view-task-button" onClick={() => navigate("/history")}>Back to Task List</button>
      </div>
    </div>
  );

};

export default ViewTask;
