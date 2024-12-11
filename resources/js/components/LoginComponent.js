import React from 'react'

const LoginComponent = () => {
  return (
    <div>
        <form method="POST" action="/login">
            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default LoginComponent
