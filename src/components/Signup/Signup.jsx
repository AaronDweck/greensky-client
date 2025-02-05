import { useState, useContext } from 'react'
import { signup } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

// Styles
import styles from './Signup.module.css'

export default function Signup(){
  // Context
  // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
  const { user, setUser } = useContext(UserContext)
  console.log(user)

  // State
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  // Events
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signup(formData)
      setToken(data.token)
      // Set the global user context/state
      setUser(getUserFromToken())
      // Navigate to posts page
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  }

  console.log(errors)

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className={styles.container}>
      <h1>Sign up</h1>
      <p>You are creating an account on GreenSky</p>
      <form onSubmit={handleSubmit}>

        {/* Display Name */}
        <div className="form-control">
          <label htmlFor="displayName">Display name</label>
          <input 
            type="text"
            name="displayName" 
            id="displayName"
            placeholder="Enter a display name"
            required
            onChange={handleChange}
          />
          { errors.displayName && <p className='error-message'>{errors.displayName}</p> }
        </div>

        {/* Username */}
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            name="username" 
            id="username"
            placeholder="Enter a username"
            required
            onChange={handleChange}
          />
          { errors.username && <p className='error-message'>{errors.username}</p> }
        </div>

        {/* Email */}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            name="email" 
            id="email"
            placeholder="Enter an email address"
            required
            onChange={handleChange}
          />
          { errors.email && <p className='error-message'>{errors.email}</p> }
        </div>

        {/* Password */}
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password" 
            id="password"
            placeholder="Enter a password"
            required
            onChange={handleChange}
          />
          { errors.password && <p className='error-message'>{errors.password}</p> }
        </div>

        {/* Password Confirmation */}
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input 
            type="password"
            name="confirmPassword" 
            id="confirmPassword"
            placeholder="Re-type the password"
            required
            onChange={handleChange}
          />
          {(formData.password.length > 0 && formData.confirmPassword > 0 || formData.password !== formData.confirmPassword) &&
            <p className='error-message'>Passwords do not match</p>
          }
        </div>

        <button disabled={formData.password === '' || formData.password !== formData.confirmPassword} type="submit">Submit</button>

      </form>
    </section>
  )
}
