import React from 'react'
import logo from '../assets/logo.svg'
import { NavLink, useNavigate } from "react-router-dom"
import { isUserLoggedIn, logout } from '../service/AuthApiService'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn()
    const navigate = useNavigate()
    const username=sessionStorage["username"]
    function handleLogout() {
        logout()
        navigate('/login')
    }

    function isUrlHistory() {
        let url = window.location.href
        return url.endsWith("history")
    }

    return (
        <div>
            <nav className="fixed-top navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <a className="navbar-brand fw-bold">
                         <img src={logo} alt="logo" width={30} height={30} />
                         &nbsp;&nbsp;TASK MANAGER &nbsp;&nbsp;
                         </a> 
                         <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div>👤</div>
                            <div><strong>{username}</strong></div>
                            </div>

                    <ul className="navbar-nav gap-4">
                        {/* {
                            isAuth &&
                            <li className="nav-item">
                                {
                                    isUrlHistory() ?  <NavLink className='nav-link' to='/Tasks'>Tasks</NavLink> :  <NavLink className='nav-link' to='/history'>Task History</NavLink>
                                }
                            </li>
                        } */}
                        {
                            !isAuth &&

                            <li className="nav-item">
                                <NavLink className='nav-link' to='/create-account'>Create account</NavLink>
                            </li>
                        }
                        {
                            !isAuth &&
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/login'>Login</NavLink>
                            </li>
                        }
                        {
                            isAuth &&
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/login' onClick={handleLogout}>Logout</NavLink>
                            </li>
                        }
                        {
                            isAuth &&
                        <li className="nav-item">
                                <NavLink className='nav-link' to='/history'>Task History</NavLink>
                        </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HeaderComponent