import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import { Reg } from './components/Reg'
import { Auth } from './components/Auth'
import { pushUser } from './fetch/pushUser'
import { PageRequests } from './components/PageRequests'
import { NewRequest } from './components/NewRequest'
import { pushNewRequest } from './fetch/pushNewRequest'


function App() {
  const [users,setUsers]=useState([])
const [currentUserId, setCurrentUserId]= useState(null)
const [requests , setRequests]= useState([])


  const addUser = (newUser)=>{
    setUsers([...users, newUser])
    pushUser(newUser)
  }

const handleLogin = (userId)=>{
  setCurrentUserId(userId) //Сохраняем ID авторизованного пользователя
}


const addRequest = (newRequest)=>{
setRequests([...requests,newRequest])
pushNewRequest(newRequest)
}

  return (
    <>
      <Routes>
        <Route path='/' element={<PageRequests userId={currentUserId}/>} />
         <Route path="/reg" element={<Reg addUser={addUser} />} />
           <Route path="/auth" element={<Auth users={users} handleLogin={handleLogin}/>} />
           <Route path='/newRequest' element={<NewRequest userId={currentUserId} addRequest={addRequest}/>} />
      </Routes>

    </>
  )
}

export default App
