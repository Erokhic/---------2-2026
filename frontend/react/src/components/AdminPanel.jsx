import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getUserById } from "../fetch/getUserById"
import { allRequestions } from "../fetch/allRequestions"
import { getStatuses } from "../fetch/getStatuses"
import { updateRequestStatus } from "../fetch/updateRequestStatus"

export function AdminPanel({ userId }) {
    const nav = useNavigate()
    const [requests, setRequests] = useState([])
    const [statuses, setStatuses] = useState([])





    useEffect(() => {

        const checkAdmin = async () => {
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
                if (user.id_role !== 2) {
                    alert('Доступ запрещен. Только для администраторов.')
                    nav('/auth')
                    return
                }
                const requestData = await allRequestions()
                setRequests(requestData)

                const statuseData = await getStatuses()
                setStatuses(statuseData)


            } catch (error) {
                console.log(error);
                nav('/auth')
            }
        }

        checkAdmin()


    }, [userId])

    const handleStatusChange = async(requestId, newStatusId) => {
       
        
       console.log('requestId в handleStatusChange:', requestId)
    try{
 const parsedStatusId = parseInt(newStatusId)

           setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, id_status: parsedStatusId }
            : request
        
      ))

        await updateRequestStatus(requestId, parsedStatusId)
        
    }catch(error){
        console.log(error);
        alert('Не удалось обновить статус')
    }
    }



    return (

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
                            <td colSpan="5">Нет заявок</td>
                        </tr>
                    ) : (
                        requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.full_name}</td>
                                <td>{request.payment_name}</td>
                                <td>{request.course_name}</td>
                                <td>{new Date(request.start_date).toLocaleDateString()}</td>
                                <td><select value={request.id_status} onChange={(e) => handleStatusChange(request.id, e.target.value)}>{
                                    statuses.map((status) => (
                                        <option key={status.id} value={status.id}>{status.name}</option>
                                    ))
                                }
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