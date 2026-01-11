import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate()
    const pass = () => {
        if(localStorage.getItem('user')){
                navigate('/home')
        }
        else{
            navigate('/signin')
        }
    }
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: '450px', width: '100%' }}>
        
        <h1 className="fw-bold mb-3">Welcome</h1>
        
        <p className="text-muted mb-4">
          Read, write, and share amazing blogs.
          Start your journey with us today.
        </p>

        <button
          className="btn btn-primary btn-lg w-100"
          onClick={pass}
        >
          Get Started
        </button>

      </div>
    </div>
  )
}


export default Welcome