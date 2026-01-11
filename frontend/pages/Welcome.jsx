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
  return (<>
    <div>Welcome</div>
    <button className='btn btn-primary' onClick={pass}>Getstarted</button>
    </>
  )
}

export default Welcome