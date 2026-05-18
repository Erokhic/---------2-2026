import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser } from "../fetch/getUser"

export function Auth({ userId,  handleLogin}) {
    const nav = useNavigate()
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()


        if (!formData.login || !formData.password) {
            alert('Заполните все поля')
            return
        }

        async function check() {
            const userDB = await getUser(formData)

            if (userDB.length !== 0) {
                const user = userDB[0]
                handleLogin(user)
                if (user.id_role === 2) {
                    nav('/admin')
                    return
                } else {
                    nav('/requests')
                }
            } else {
                alert('Неверный логин или пароль')
                setFormData({
                    login: '',
                    password: ''
                })
            }


        }

        check()

    }




    return (
        <>
            <form onSubmit={onSubmit}>
                <h2>Авторизация</h2>
                <span>Логин</span><br />
                <input type="text" name="login" value={formData.login} onChange={onChange} /><br />

                <span>Пароль</span><br />
                <input type="password" name="password" value={formData.password} onChange={onChange} /><br />
                <button type="submit">Войти</button>
                <p onClick={()=> nav('/')}>Еще не зарегистрированы?</p>
            </form>

        </>

    )
}