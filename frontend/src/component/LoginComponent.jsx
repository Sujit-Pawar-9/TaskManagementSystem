import React, { useState } from "react"
import { Container, Row, Col } from 'react-bootstrap';
import { loginApi, saveLoggedUser, storeBasicAuth } from "../service/AuthApiService"
import { useNavigate } from "react-router-dom"

const LoginComponent = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    async function handleLoginForm(event) {
        event.preventDefault()

        if (validateForm()) {

            await loginApi(username, password)
                .then(response => {
                    console.log(response.data);
                    const basicAuth = 'Basic ' + btoa(username + ':' + password)
                    const role = response.data.role
                    storeBasicAuth(basicAuth)
                    saveLoggedUser(response.data.id, username, role)
                    console.log("hi")
                    navigate(`/tasks`)
                })
                .catch(error => console.error(error))
        }

    }

    function validateForm() {
        let valid = true

        const errorsCopy = { ...errors }

        if (username.trim()) {
            errorsCopy.username = ''
        } else {
            errorsCopy.username = 'username required'
            valid = false
        }

        if (password.trim()) {
            errorsCopy.password = ''
        } else {
            errorsCopy.password = 'password required'
            valid = false
        }
        setErrors(errorsCopy)

        return valid
    }

    return (
        <div className="center-in-page">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg={5}>
                        <form className="bg-light shadow-lg p-4">
                            <div className="d-flex gap-2">
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        name="username"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        placeholder="Username"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                    />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-dark mt-3" onClick={(event) => handleLoginForm(event)}>Login</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginComponent