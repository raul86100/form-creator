import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate("/user")}>Login</div>
  )
}

export default Login