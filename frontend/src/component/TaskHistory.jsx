import { useEffect, useState } from "react"
import { deleteTask, markDone, markPending, retrieveAllTasks } from "../service/TaskApiService"
import { Link, useNavigate } from "react-router-dom"
import taskDoneSound from '../assets/done.mp3'
import '../css/tasks.css'

const TaskHistory = () => {
    const [tasks, setTasks] = useState([]);

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
    
    return (
        <div className="TaskHistory">
          <h2>Task List</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.task}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(task.id)}
                      >Delete</button>
                      
                     <button
                    type="button"
                    className="btn btn-primary ms-2"
                    onClick={() => handleEdit(task.id)}
                  >
                    Edit
                  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default TaskHistory