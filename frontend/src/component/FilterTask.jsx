import React from "react";
import { useNavigate } from "react-router-dom";
import "./viewTask.css"; 
const FilterTask = () => {
    const navigate = useNavigate();

    const handleDueTodayFilter = () => {
        // Handle due today filter
    };

    const handleHighPriorityFilter = () => {
        // Handle high priority filter
    };

    const handleCancel = () => {
        navigate("/tasks"); // Navigate back to TaskHistory component
    };

    return (
        <div className="view-task-container ">
           <div className="view-task-content">
              <h2 className="view-task-title">Filter Options</h2>
              <div className="view-task-details">
            <button onClick={handleDueTodayFilter}>Due Today</button>
            <button onClick={handleHighPriorityFilter}>High Priority</button>
            
            </div>
            <button className="view-task-button" onClick={handleCancel}>Cancel</button>
            
     
        </div>
        </div>
    );
};

export default FilterTask;
