import { useState, useContext } from "react"
import { login } from "../../services/userService"
import { setToken, getUserFromToken } from '../../utils/auth'
import { UserContext } from "../../contexts/UserContext"

export default function Login() {

    const {user, setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    })

    const [errors, setErrors] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        console.log(user)
        try {
            const res = await login(formData)
            setToken(res.data.token)
            setUser(getUserFromToken())
            alert('Login successful')
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message)
        }
    }

    function handleChange(e) {
        setErrors('')
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    return(
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="identifier">Username or Email: </label>
                    <input type="text" name="identifier" id="identifier" value={formData.identifier} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
                </div>
                {errors && <p>{errors}</p> }

                <button type="submit">Login</button>
            </form>

        </section>
    )
}