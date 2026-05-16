import { useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import { getCourseName} from "../fetch/getCourseName.js"
import { getStatuses } from "../fetch/getStatuses.js"



export function PageRequests({userId , addComment}){

    const nav = useNavigate()
const [requests , setRequests]= useState([])
const [statuses , setStatuses] = useState([])

const [comment, setComment]= useState({
    id_request: '',
    text_comment: ''
})
    const handleNewRequest = ()=>{
        if (!userId) {
            alert('Пожалуйста, авторизуйтесь')
            nav('/auth')
            return
        }else{
            nav('/newRequest')
        }
        
    }

    const onSubmit= (e)=>{
        e.preventDefault()
  if (!userId) {
            alert('Пожалуйста, авторизуйтесь')
            nav('/auth')
            return
        }
        if (!comment.id_request) {
             alert('Выберите курс')
            return
        }
        if (!comment.text_comment.trim()) {
            alert('Введите текст')
            return
        }
        const NewComment ={
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

const onChange=(e)=>{
    const {name, value}= e.target
    setComment({...comment, [name]: value})
}

  const getStatusName = (statusId) => {
        const status = statuses.find(s => s.id === statusId)
         return status ? status.name : 'Неизвестно'
    }

useEffect(()=>{
     const parsedId = Number(userId)
    const selectedCourses = async () => {
         if (!userId || isNaN(userId)) {
                console.log('userId не передан или некорректен:', userId);
                return;
            }
    try {
  const requestsData = await getCourseName(userId) 
                setRequests(requestsData)

        const statusesData = await getStatuses()
        setStatuses(statusesData)

       
    } catch (error) {
        console.log(error);    
    }
    }
    selectedCourses()
},[userId])   

    return(
        <>
        <h2>Мои заявки</h2>
        <button onClick={handleNewRequest}>Подать заявку</button>
        <form onSubmit={onSubmit}>
            <h2>Оставить отзыв</h2>
            <select name="id_request" value={comment.id_request} onChange={onChange}>
                <option value="">Выберите курс</option>
                {requests.map((request)=>(
                    <option key={request.id} value={request.id}>{request.course_name}</option>
                ))}
                
            </select>
            <span>Отзыв</span>
            <input type="text" name="text_comment" value={comment.text_comment} onChange={onChange}/>
            <button type="submit">Отправить</button>
        </form>
        

         <table>
                <thead>
                    <tr>
                        <th>Название курса</th>
                        <th>Способ оплаты</th>
                        <th>Дата начала</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length === 0 ? (
                        <tr>
                            <td colSpan="4">Нет заявок</td>
                        </tr>
                    ) : (
                        requests.map((request) => (
                            <tr key={request.id}>
                                  <td>{request.course_name}</td>
                                <td>{request.id_payment_method}</td>
                                <td>{request.start_date ? new Date(request.start_date).toLocaleDateString():'-'}</td>
                                <td>{getStatusName(request.id_status)}
                                    </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}