import './App.css'
import { Outlet } from 'react-router-dom';

function App({children}) {

  return (
    <>
      {children}
      <Outlet />      
    </>
  )
}

export default App
