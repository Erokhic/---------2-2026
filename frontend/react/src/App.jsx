import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import { Reg } from '../components/Reg'
import { Auth } from '../components/Auth'


function App() {
  const [users,setUsers]=useState([])

  const addUser = (newUser)=>{
    setUsers([...users, newUser])
  }

  return (
    <>
      <Routes>
        {/* <Route path='/' element={} /> */}
         <Route path="/" element={<Reg addUser={addUser} />} />
           <Route path="/auth" element={<Auth users={users}/>} />
      </Routes>

    </>
  )
}

export default App
