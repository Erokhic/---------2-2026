import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getStatuses } from "../fetch/getStatuses.js"
import { userRequests } from "../fetch/UserRequests.js"
import { getPaymentMethod } from "../fetch/getPaymentMethod.js"
import { getComment } from "../fetch/getComment.js"



export function PageRequests({ userId, addComment , handleLogout }) {

    const nav = useNavigate()
    const [requests, setRequests] = useState([])
    const [statuses, setStatuses] = useState([])
    const [paymentMethods, setPaymentMethod] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState({
        id_request: '',
        text_comment: ''
    })
   

    const onSubmit = (e) => {
        e.preventDefault()
       
        if (!comment.id_request) {
            alert('Выберите курс')
            return
        }
        if (!comment.text_comment.trim()) {
            alert('Введите текст')
            return
        }
        const NewComment = {
            id_user: userId,
            id_request: parseInt(comment.id_request),
            text_comment: comment.text_comment,
        }
        addComment(NewComment)
        alert('Отзыв отправлен')
        setComment({
            id_request: '',
            text_comment: ''
        })
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setComment({ ...comment, [name]: value })
    }

    const getStatusName = (statusId) => {
        const status = statuses.find(s => s.id === statusId)
        return status ? status.name : 'Неизвестно'
    }

    const getPaymentName = (paymentId) => {
        const payment = paymentMethods.find(p => p.id === paymentId)
        return payment ? payment.name : 'Название'
    }
 
  
    useEffect(() => {
         if (userId==null) {
        nav("/auth");
        return;
      }
          const fetchData = async () => {
            try {
                const requestsData = await userRequests(userId)
                setRequests(requestsData)

                const statusesData = await getStatuses()
                setStatuses(statusesData)

                const paymentData = await getPaymentMethod()
                setPaymentMethod(paymentData)

                const commentData = await getComment()
                setComments(commentData)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [userId])
  const getCommentDisplay = (requestId) => {
         const requestComment = comments.find(comment => comment.id_request === requestId)
        if (!requestComment) {
            return 'Нет отзыва'
        }
    return requestComment.text_comment
    }
    return (
        <>
        <button onClick={()=> handleLogout()}>Выйти</button>
            <h2>Мои заявки</h2>
            <button type="button" onClick={()=> nav('/newRequest')}>Подать заявку</button>
            <form onSubmit={onSubmit}>
                <h2>Оставить отзыв</h2>
                <select name="id_request" value={comment.id_request} onChange={onChange}>
                    <option value="">Выберите курс</option>
                    {requests.map((request) => (
                        <option key={request.id} value={request.id}>{request.course_name}</option>
                    ))}

                </select>
                <span>Отзыв</span>
                <input type="text" name="text_comment" value={comment.text_comment} onChange={onChange} />
                <button type="submit">Отправить</button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th>Название курса</th>
                        <th>Способ оплаты</th>
                        <th>Дата начала</th>
                        <th>Статус</th>
                        <th>Отзыв</th>
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
                                <td>{request.course_name}</td>
                                <td>{getPaymentName(request.id_payment_method)}</td>
                                <td>{request.start_date ? new Date(request.start_date).toLocaleDateString() : '-'}</td>
                                <td>{getStatusName(request.id_status)}</td>
                                <td>{getCommentDisplay(request.id)}</td>
                            
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}