import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Reg({ addUser }) {
    const nav = useNavigate()
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        full_name: '',
        phone: '',
        email: ''
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }


    const onSubmit = (e) => {

        e.preventDefault()

        if (!formData.login || !formData.password || !formData.full_name || !formData.phone || !formData.email) {
            alert('Заполните все поля!')
            return
        }
        if (formData.login.trim() === '' || formData.full_name.trim() === '') {
            alert('Логин и ФИО не могут состоять из одних пробелов')
            return
        }

        const lat = /^[a-zA-Z0-9]+$/
        if (!lat.test(formData.login)) {
            alert('Логин должен быть из латинских букв и цифр')
            return
        }
        if (formData.login.length < 6) {
            alert('Логин должен быть больше 6 символов')
            return
        }
        if (formData.password.length < 8) {
            alert('Пароль должен быть больше 8 символов')
            return
        }
        const rus = /^[а-яА-ЯёЁ\s-]+$/
        if (!rus.test(formData.full_name) ) {
            alert('ФИО должно быть из сиволов кириллицы')
            return
        }

        const num = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/
        if (!num.test(formData.phone)) {
            alert('Формат номера 8(ХХХ)ХХХ-ХХ-ХХ')
            return
        }

        if (!formData.email.includes('@')) {
            alert('В почте должен использоваться спец знак (@)')
            return
        } else {

            const newUser = {
                login: formData.login,
                password: formData.password,
                full_name: formData.full_name,
                phone: formData.phone,
                email: formData.email
            }

            addUser(newUser)
            setFormData({
                login: '',
                password: '',
                full_name: '',
                phone: '',
                email: ''
            })
            nav('/auth')
        }

    }


return (
    <>
        <h2>Регистрация</h2>
        <form onSubmit={onSubmit}>
            <span>Логин</span><br/>
            <input type="text" name="login" value={formData.login} onChange={onChange} /><br/>
            <span>Пароль</span><br/>
            <input type="password" name="password" value={formData.password} onChange={onChange} /><br/>
            <span>Фио пользователя</span><br/>
            <input type="text" name="full_name" value={formData.full_name} onChange={onChange} /><br/>
            <span>Номер телефона</span><br/>
            <input type="tel" name="phone" value={formData.phone} onChange={onChange} /><br/>
            <span>Адрес электронной почты</span><br/>
            <input type="email" name="email" value={formData.email} onChange={onChange} /><br/>
            <button type="submit">Зарегистрироваться</button>
            <p onClick={()=>{nav('/auth')}}>Уже зарегистрированы?</p>
        </form>

    </>

)
}