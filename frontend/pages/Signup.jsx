
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const API = import.meta.env.VITE_API_BASE_URL ; 
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm()
    const call = async (data) => {
        let credintials = null
        try {
            console.log(data)
            const response = await axios.post(`${API}/create/user`, data)
            console.log(response.data)
            credintials = response.data
        }
        catch (error) {
            console.log(error)
        }
        if (credintials && credintials['user_id']) {
            navigate('/signin')
        }
    }

    return (
        <>
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <form className="col-12 col-sm-10 col-md-6 col-lg-5 flex justify-content-center align-items-center" onSubmit={handleSubmit((register) => { console.log(JSON.stringify(register)) })}>
                    <h3>Register here </h3>
                    <div className="form-floating mb-3 col-12">
                        <input type="text" className="form-control" id="fullname" placeholder="john doe" {...register('fullname', { required: 'first name is required' })} />
                        <label htmlFor="fullname">fullname</label>
                        {errors.fullname && <p class='error'>{errors.fullname.message}</p>}
                    </div>
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
                    <div className="form-floating mb-3 col-12">
                        <input type="password" className="form-control" id="cnf-password" placeholder="xxxxxxxxxx" {...register('cnfpassword')} />
                        <label htmlFor="cnf-password">confirm password</label>
                        {errors.cnfpassword && <p class='error'>{errors.cnfpassword.message}</p>}
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit(call)}>submit </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Signup