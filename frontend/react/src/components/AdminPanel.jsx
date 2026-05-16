import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser } from "../fetch/getUser"
import { getUserById } from "../fetch/getUserById"
import { allRequestions } from "../fetch/allRequestions"

export function AdminPanel({userId}) {
const nav = useNavigate()   
const [requests, setRequests]= useState([])


useEffect(()=>{
    const checkAdmin = async ()=>{
if (!userId) {
     alert('Сначала авторизуйтесь!')
    nav('/auth')
    return
}
try {
    const userDB = await getUserById(userId)
    if (!userDB || userDB.length === 0) {
          alert("Доступ запрещен. Только для администраторов.");
          nav("/auth");
          return;
        }
    const user = userDB[0]
    if(user.id_role !== 2){
        alert('Доступ запрещен. Только для администраторов.')
                    nav('/auth')
                    return
    }
const requestData = await allRequestions()
setRequests(requestData)

} catch (error) {
    console.log(error);
    nav('/auth')
}
    }

  checkAdmin()  


}, [userId])



    return(

<>
<h2>Панель админа </h2>
  <table>
                <thead>
                    <tr>
                        <th>ФИО пользователя</th>
                        <th>Способ оплаты</th>
                        <th>Название курса</th>
                        <th>Дата начала</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length === 0 ? (
                        <tr>
                            <td colSpan="6">Нет заявок</td>
                        </tr>
                    ) : (
                        requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.full_name}</td>
                                <td>{request.payment_name}</td>
                                <td>{request.course_name}</td>
                                <td>{new Date(request.start_date).toLocaleDateString()}</td>
                                <td><select>
                                    <option value="">{request.status_name}</option>
                                    </select>
                                    </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>



</>


    )
}