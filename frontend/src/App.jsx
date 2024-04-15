import HeaderComponent from './component/HeaderComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateAccount from './component/CreateAccount'
import LoginComponent from './component/LoginComponent'
import { getLoggedInUserId, isUserLoggedIn } from './service/AuthApiService'
import WelcomePage from './component/Welcome'
import TasksComponent from './component/TasksComponent'
import AddTaskComponent from './component/AddTaskComponent'
import TaskHistory from './component/TaskHistory'
import EditTask from "./component/EditTask";
import ViewTask from "./component/ViewTask";


function App() {
  const activeUserId = getLoggedInUserId()

  function AuthenticatedRoute({ children }) {
    const isAuthenticated = isUserLoggedIn()

    if (isAuthenticated) {
      return children
    }
    return <Navigate to="/" />
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/tasks' element={<TasksComponent userId={activeUserId} />}/>        
          <Route path='/add-task' element={
            <AuthenticatedRoute>
              <AddTaskComponent userId={activeUserId} />
            </AuthenticatedRoute>
          } />
          <Route path='/history' element={
            
              <TaskHistory userId={activeUserId} />
           
          } />
          <Route path='/update-task/:id' element={
            <AuthenticatedRoute>
              <AddTaskComponent userId={activeUserId} />
            </AuthenticatedRoute>
          } />
          <Route path="/edit-task/:taskId" element={<EditTask />} /> 
          <Route path="/view-task/:taskId" element={<ViewTask />} /> 
         
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/login' element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App