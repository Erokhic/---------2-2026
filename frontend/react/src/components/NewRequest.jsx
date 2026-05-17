import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPaymentMethod } from "../fetch/getPaymentMethod.js"

export function NewRequest({userId , addRequest}) {

    const nav = useNavigate()
    const [formData, setFormData] = useState({
        course_name: '',
        start_date: '',
        payment_method: ''
    })

    const [paymentMethod, setPaymentMethod] = useState([])

    useEffect(() => {
if(!userId){
    alert('Пожалуйста, авторизуйтесь!')
    console.log('userId в NewRequest:', userId)
    nav('/auth')
    return
}
        const fetchMethod = async () => {
            try{
              const response = await getPaymentMethod()
            console.log(response);
            setPaymentMethod(response)  
            }
            catch (error) {
                console.log(error);
            }
        }
fetchMethod()
    },[])
    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

const onSubmit = async (e)=>{
    e.preventDefault()


    if(!formData.course_name.trim()){
        alert('Заполните название курса')
        return
    }
if(!formData.start_date){
        alert('Заполните дату начала обучения!')
        return
    }
    const selectedDate = new Date(formData.start_date)
    const Today = new Date()

    if(selectedDate  < Today){
        alert('Дата начала обучения не может быть в прошлом')
        return
    }
if(!formData.payment_method){
        alert('Выберите способ оплаты!')
        return
    }else{
        const newRequest = {
            id_user: parseInt(userId),
            course_name: formData.course_name,
        start_date: formData.start_date,
        id_payment_method: parseInt(formData.payment_method)
        }

        addRequest(newRequest)
        alert('Заявка успешно отправлена администратору')
        setFormData({
        course_name: '',
        start_date: '',
        payment_method: '' 
        })
        nav('/requests')
    }

}

    return (
        <>
            <h2>Формирование заявки</h2>
            <form onSubmit={onSubmit}>
                <span>Название курса</span><br />
                <input type="text" name="course_name" value={formData.course_name} onChange={onChange} /><br />
                <span>Планируемая дата начала обучения</span><br />
                <input type="date" name="start_date" value={formData.start_date} onChange={onChange} /><br />

                <span>Способ оплаты</span><br />
                <select name="payment_method" value={formData.payment_method} onChange={onChange}>
                    <option value="">-Выберите способ</option>
                    {paymentMethod.map((method)=> (
                        <option key={method.id} value={method.id}>{method.name}</option>
                    ))}
                </select><br />
                <button type="submit">Отправить</button>
            </form>

        </>
)}    