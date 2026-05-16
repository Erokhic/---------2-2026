import { useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import { getCourseName} from "../fetch/getCourseName.js"

export function PageRequests({userId , addComment}){

    const nav = useNavigate()
const [requests , setRequests]= useState([])

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

useEffect(()=>{
    const selectedCourses = async () => {
    try {
        const response = await getCourseName(userId)
        console.log(response);
        
        setRequests(response)
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
        
        </>
    )
}