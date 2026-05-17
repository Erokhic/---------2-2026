import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import { Reg } from './components/Reg'
import { Auth } from './components/Auth'
import { pushUser } from './fetch/pushUser'
import { PageRequests } from './components/PageRequests'
import { NewRequest } from './components/NewRequest'
import { pushNewRequest } from './fetch/pushNewRequest'
import { pushComment } from './fetch/pushComment'
import { AdminPanel } from './components/AdminPanel'

function App() {
  const [users,setUsers]=useState([])
const [currentUserId, setCurrentUserId]= useState(null)
const [requests , setRequests]= useState([])
const [comments, setComments]= useState([])

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

const addComment = (newComment)=>{
setComments([...comments, newComment])
pushComment(newComment)
}

  return (
    <>
      <Routes>
        <Route path='/requests' element={<PageRequests userId={currentUserId} addComment={addComment}/>} />
         <Route path="/" element={<Reg addUser={addUser} />} />
           <Route path="/auth" element={<Auth users={users} handleLogin={handleLogin}/>} />
           <Route path='/newRequest' element={<NewRequest userId={currentUserId} addRequest={addRequest}/>} />
              <Route path="/admin" element={<AdminPanel userId={currentUserId}/>} />
      </Routes>

    </>
  )
}

export default App
