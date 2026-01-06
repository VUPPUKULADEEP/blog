
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'


const Signin = () => {

  const { register, formState: { errors }, handleSubmit } = useForm()
  
      return (
          <>
              <div id="container" className='d-flex justify-content-center align-items-center' style={{ height: '100vh', minWidth: '50%' }}>
                  <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{ width: '25%' }} onSubmit={handleSubmit((register) => { console.log(JSON.stringify(register)) })}>
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
                          <button className="btn btn-primary" type="submit" >submit </button>
  
                      </div>
  
                  </form>
              </div>
          </>
      )
}

export default Signin