import { useEffect, useState } from "react"
import { deleteTask, markDone, markPending, retrieveAllTasks } from "../service/TaskApiService"
import { Link, useNavigate } from "react-router-dom"


import taskDoneSound from '../assets/done.mp3'
import '../css/tasks.css'

const TaskHistory = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await retrieveAllTasks();
          setTasks(response.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
  
      fetchTasks();
    }, []);
    const handleDelete = async (taskId) => {
        try {
          await deleteTask(taskId);
          // Remove the deleted task from the state
          setTasks(tasks.filter(task => task.id !== taskId));
          // Optionally, you can navigate to a different page after deletion
          // navigate('/tasks'); // Uncomment this line if you want to navigate
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
    const handleback = () =>{
      navigate(`/tasks`)
    }
    return (
      <div className="TaskHistory">
        <h2>Task List</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Task Title</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.completed ? <span style={{ color: 'blue' }}>✔️</span> : "⌛"}</td>
                  <td>{task.title}</td>
                  <td>{task.taskCreatedAt}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary ms-2"
                      onClick={() => handleEdit(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary ms-2"
                      onClick={() => handleView(task.id)}
                    >
                      view 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
}

export default TaskHistory