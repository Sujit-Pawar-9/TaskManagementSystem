import { useEffect, useState } from "react"
import { createTask } from "../service/TaskApiService"
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const AddTaskComponent = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const taskCreatedAt = new Date().toDateString();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    function saveTask(event) {
        event.preventDefault();

        if (validateForm()) {
            const taskObj = { title, description, dueDate, completed, taskCreatedAt };
            createTask(taskObj)
                .then(() => navigate('/tasks'))
                .catch(error => console.error(error));
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors };

        if (title.trim()) {
            errorsCopy.title = '';
        } else {
            errorsCopy.title = 'Title field is required';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description field is required';
            valid = false;
        }

        if (dueDate.trim()) {
            errorsCopy.dueDate = '';
        } else {
            errorsCopy.dueDate = 'Due date field is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className="center-in-page">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg={6}>
                        <p className="fs-3">Add Task</p>
                        <form className="bg-light shadow-lg p-4">
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <textarea
                                    placeholder="Description"
                                    name="description"
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>
                            &nbsp;&nbsp;Due Date
                            <div className="form-group mb-2">
                                <input
                                    type="date"
                                    placeholder="Due Date"
                                    name="dueDate"
                                    className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
                                    value={dueDate}
                                    onChange={(event) => setDueDate(event.target.value)}
                                />
                                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
                            </div>
                            <button className="btn btn-dark" onClick={(event) => saveTask(event)}>Create Task</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddTaskComponent;
