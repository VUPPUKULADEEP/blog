
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const Signin = () => {
    const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm()
  const call = async (data) =>{
    let credintials = null
    try{
        const response = await axios.post("http://127.0.0.1:8000/auth/login", data)
    
    console.log(response.data)
    credintials = response.data}
    catch(error) {
        console.log(error)
    }
    if(credintials['id']){
        navigate('/home')
    }

  }
      return (
          <>
              <div id="container" className='d-flex justify-content-center align-items-center' style={{ height: '100vh', minWidth: '50%' }}>
                  <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{ width: '25%' }} >
                      <h3>login here </h3>
                      
                      <div className="form-floating mb-3 col-12">
                          <input type="email" className="form-control" id="email" placeholder="name@example.com" {...register('email')} />
                          <label htmlFor="email">email</label>
                          {errors.email && <p class='error'>{errors.email.message}</p>}
                      </div>
                      <div className="form-floating mb-3 col-12">
                          <input type="password" className="form-control" id="password" placeholder="xxxxxxxxxx" {...register('password')} />
                          <label htmlFor="password">password</label>
                          {errors.password && <p class='error'>{errors.password.message}</p>}
                      </div>
                      
                      <div className="d-grid gap-2 col-12 mx-auto">
                          <button className="btn btn-primary" type="submit" onClick={handleSubmit(call)}>submit </button>
  
                      </div>
  
                  </form>
              </div>
          </>
      )
}

export default Signin