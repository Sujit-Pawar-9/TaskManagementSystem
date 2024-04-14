import { useEffect, useState } from "react";
import { deleteTask,retrieveAllTasksforsort,retrieveAllTasksforsortdesc, retrieveAllTasks } from "../service/TaskApiService";
import { Link, useNavigate } from "react-router-dom";

import taskDoneSound from '../assets/done.mp3';
import '../css/tasks.css';

const TaskHistory = () => {
    const [tasks, setTasks] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc"); // State to manage sorting order
    const navigate = useNavigate();

    const [filterOption, setFilterOption] = useState("");
   

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
      try {
          let sortedTasks = [];
          if (sortOrder === "asc") {
              sortedTasks = await retrieveAllTasksforsort();
          } else {
              sortedTasks = await retrieveAllTasksforsortdesc();
          }
          setTasks(sortedTasks.data);
      } catch (error) {
          console.error("Error fetching tasks:", error);
      }
  };
    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEdit = (taskId) => {
        navigate(`/edit-task/${taskId}`);
    };

    const handleView = (taskId) => {
        navigate(`/view-task/${taskId}`);
    };

    const handleSort = () => {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
      fetchTasks();
  };
  const filterTasksDueToday = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format
    const tasksDueToday = tasks.filter(task => task.dueDate === today);
    setTasks(tasksDueToday);
  };
  const filterHighPriorityTasks = () => {
    const highPriorityTasks = tasks.filter(task => task.priority === "high");
    setTasks(highPriorityTasks);
};
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };
    const handleback = () => {
        navigate(`/tasks`);
    };
    const filterTasks = () => {
      switch (filterOption) {
          case "dueToday":
              filterTasksDueToday();
              break;
          case "highPriority":
              filterHighPriorityTasks();
              break;
          default:
              fetchTasks(); // Reset to default tasks
              break;
      }
  };
    useEffect(() => {
      filterTasks();
  }, [filterOption]);
    return (
        <div className="TaskHistory">
            <h2>Task List</h2>
            <div className="table-container" style={{ position: "relative" }}>
              <div className="filter-options" style={{ position: "absolute", bottom: "97%", right: 0 }}>
     
               <select className="filter-dropdown" value={filterOption} onChange={handleFilterChange}>
                    <option value="">All Tasks</option>
                    <option value="dueToday">Due Today</option>
                    <option value="highPriority">High Priority</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Task Title</th>
                            <th style={{ cursor: "pointer", width: "22%" }}>Created At</th>
                            <th onClick={handleSort} style={{ cursor: "pointer", width: "22%" }}>Due Date {sortOrder === "asc" ? "▲" : "▼"}</th>
                            <th>Actions</th>
                            {/* <th>Priority</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.completed ? <span style={{ color: 'blue' }}>✔️</span> : "⌛"}</td>
                                <td>{task.title}</td>
                                <td >{task.taskCreatedAt}</td>
                                <td >{task.dueDate}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </button>
                                    </td>
                                    <td>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-primary ms-2"
                                        onClick={() => handleEdit(task.id)}
                                    >
                                        Edit
                                    </button>
                                    </td>
                                    <td>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-primary ms-2"
                                        onClick={() => handleView(task.id)}
                                    >
                                        view
                                    </button>
                                </td>
                                {/* <td>{task.priority}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <button
                    type="button"
                    className="btn btn-primary ms-2"
                    onClick={handleback}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default TaskHistory;
