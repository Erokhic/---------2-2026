import { useState } from "react"
import { useNavigate } from "react-router-dom"
export function Auth({users}) {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    const nav = useNavigate()
    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!formData.login || !formData.password){
            alert('Вы не заполнили все поля')
            return
        }
       const user = users.find(u => u.login === formData.login);

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (user.password !== formData.password) {
      alert("Неверный пароль");
      return;
    }

    alert("Авторизация успешна!");
    nav("/");
}
    return (
        <>
            <form onSubmit={onSubmit}>
                <h2>Авторизация</h2>
                <span>Логин</span><br />
                <input type="text" name="login" value={formData.login} onChange={onChange} /><br />
                <span>Пароль</span><br />
                <input type="password" name="password" value={formData.password} onChange={onChange} /><br />
                <button>Войти</button>
                <p onClick={() => nav('/')}>Еще не зарегистрированы?</p>
            </form>

        </>
    )
}