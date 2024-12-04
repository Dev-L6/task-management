import AddTask from './components/AddTask';
import Task from './components/Task';
import EditTask from './components/EditTask';
import TaskDetails from './components/TaskDetails';
import { Route, Routes, Navigate } from 'react-router-dom';


function App() {

  return (
    <>
   
  <div className='min-h-screen p-4 '>
    <div className='max-w-2xl mx-auto  shadow-md rounded-md p-6'>
      <h1 className='text-2xl font-bold  text-center mb-4'>Task Management App</h1>
      <Routes>
      <Route path='/' element={<><AddTask /> <Task /></>} />
<Route path='/edit/:taskId' element={<EditTask/>} />
<Route path='/details/:taskId' element={<TaskDetails/>} />
<Route path="*" element={<Navigate to="/" />} />
  </Routes>
    </div> 
     </div>
    </>
  )
}

export default App
