
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { AppContext } from '../contexts/LoginProvider'


const Signin = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('user')){
                navigate('/home')
        }
    })
    
    const { register, formState: { errors }, handleSubmit } = useForm()
    const call = async (data) => {
        let credintials = null
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/login", data)

            console.log(response.data)
            localStorage.setItem("user", JSON.stringify(response.data));
            setTimeout(() => {
                if (localStorage.getItem('user')) {
                    localStorage.removeItem("user");
                }

            }, 60 * 60 * 1000);

            credintials = response.data
        }
        catch (error) {
            console.log(error)
        }
        if (credintials['id']) {
            navigate('/home')
        }

    }
    return (
        <>
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <form className="col-12 col-sm-10 col-md-6 col-lg-5 flex justify-content-center align-items-center">
                    <h3 className="mb-4">Login here </h3>

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
                    <div className='d-flex justify-content-end mt-3'>
                        <button className='btn btn-link' onClick={() => {navigate('/signup')}}>signup here</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin