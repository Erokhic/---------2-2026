import { useNavigate } from "react-router-dom"

export function PageRequests({userId}){

    const nav = useNavigate()


    const handleNewRequest = ()=>{
        if (!userId) {
            alert('Пожалуйста, авторизуйтесь')
            nav('/auth')
            return
        }else{
            nav('/newRequest')
        }
    }

    

    return(
        <>
        <h2>Мои заявки</h2>
        <button onClick={handleNewRequest}>Подать заявку</button>
        <form >
            <h3>Оставить отзыв</h3>
            <select name="" id="">
                <option value="">Выберите курс</option>
            </select>
            <span>Отзыв</span>
            <input type="text"/>
            <button type="submit">Отправить</button>
        </form>
        
        </>
    )
}