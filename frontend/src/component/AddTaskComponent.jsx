import React, { useState } from "react";
import { createTask } from "../service/TaskApiService";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const AddTaskComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low'); // Default priority is set to low
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
            const taskObj = { title, description, dueDate, priority, completed, taskCreatedAt };
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
                            {/* Priority Selection */}
                            <div className="form-group mb-2">
                                <label>Priority:</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id="lowPriority"
                                            name="priority"
                                            value="low"
                                            className="form-check-input"
                                            checked={priority === 'low'}
                                            onChange={() => setPriority('low')}
                                        />
                                        <label htmlFor="lowPriority" className="form-check-label">Low</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id="mediumPriority"
                                            name="priority"
                                            value="medium"
                                            className="form-check-input"
                                            checked={priority === 'medium'}
                                            onChange={() => setPriority('medium')}
                                        />
                                        <label htmlFor="mediumPriority" className="form-check-label">Medium</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            id="highPriority"
                                            name="priority"
                                            value="high"
                                            className="form-check-input"
                                            checked={priority === 'high'}
                                            onChange={() => setPriority('high')}
                                        />
                                        <label htmlFor="highPriority" className="form-check-label">High</label>
                                    </div>
                                </div>
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
