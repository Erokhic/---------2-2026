import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Reg( {addUser}) {
    const nav = useNavigate()

    const [formData, setFormData] = useState({
        login: '',
        password: '',
        full_name: '',
        tel: '',
        mail: ''
    })


    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }


    const onSubmit = (e) => {
        e.preventDefault()

        if (!formData.login || !formData.password || !formData.full_name || !formData.tel || !formData.mail) {
            alert('Заполните все поля!')
            return
        }
        const regest = /^[a-zA-Z0-9]+$/
        if (!regest.test(formData.login)) {
            alert('Логин должен содержать только латинские буквы и цифры')
            return
        }

        if (formData.login.length < 6) {
            alert('Длина логина минимум 6')
            return
        }
        
        if (formData.password.length < 8) {
            alert('Длина пароля минимум 6')
            return
        }

        const rus = /^[а-яА-ЯёЁ ]+$/
        if (!rus.test(formData.full_name)) {
            alert('ФИО должно содержать символы кириллицы и пробелы')
            return
        }

        const number = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/
        if (!number.test(formData.tel)) {
            alert('Телефон должен быть введен в формате 8(XXX)XXX-XX-XX')
            return
        }

        if (!formData.mail.includes('@')) {
            alert('Вы не указали спец знак @')
            return
        }
const newUser = {
      login: formData.login,
        password: formData.password,
        full_name: formData.full_name,
        tel: formData.tel,
        mail: formData.mail
}

addUser(newUser)
alert(`Вы успешно зарегистрировались, ${formData.full_name}!`)
setFormData({
     login: '',
        password: '',
        full_name: '',
        tel: '',
        mail: ''
})
nav('/auth')
    }

        return (
            <>
                <form onSubmit={onSubmit}>
                    <h2>Регистрация</h2><br />
                    <span>Логин</span><br />
                    <input type="text" name="login" value={formData.login} onChange={onChange} /><br />
                    <span>Пароль</span><br />
                    <input type="password" name="password" value={formData.password} onChange={onChange} /><br />
                    <span>ФИО пользователя</span><br />
                    <input type="text" name="full_name" value={formData.full_name} onChange={onChange} /><br />
                    <span>Телефон</span><br />
                    <input type="tel" name="tel" value={formData.tel} onChange={onChange} /><br />
                    <span>Адрес электронной почты</span><br />
                    <input type="email" name="mail" value={formData.mail} onChange={onChange} /><br />
                    <button type="submit">Создать пользователя</button>
                     <p onClick={()=> nav('/auth')}>Уже есть аккаунт?</p>
                </form>

            </>
        )
    }