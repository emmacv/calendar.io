import React from 'react'
import AuthForm from '../components/AuthForm'

export default function Register() {
  return (
    <AuthForm>
      <h2>Register</h2>
      <form>
        <div>
          <label>Name</label>
          <input name="name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Create account</button>
      </form>
    </AuthForm>
  )
}
