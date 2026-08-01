import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const submitLogin = (data) => {
    setLoading(true);
    axios.post("http://127.0.0.1:8000/api/token", {
      username: data.username,
      password: data.password
    })
    .then(response => {
      const data = response.data;
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setLoading(false);
      checkAuth();
    })
    .catch(error => {
      if (error.status == 401) {
        setError("Invalid username and/or password")
      } else {
        console.error(error)
      }
      setLoading(false);
    })
    reset();
  }

  return (
    <section className='container'>
        <h1 className='heading'>
            Login
        </h1>
        {
          error && (
            <p className='text-red-500'>
              {error}
            </p>
          )
        }
        <form
          onSubmit={handleSubmit(submitLogin)} 
          className='max-w-lg space-y-3 mt-3'
        >
          <div className='flex flex-col'>
            <label htmlFor="username">
              Username
            </label>
              {
                errors.username ? <p className='text-red-500'>{errors.username.message}</p> : ''
              }
            <input 
            type="text" 
            className='input'
            id='username'
            {...register("username", {
              required: "You must enter a username"
            })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password">
              Password
            </label>
              {
                errors.password ? <p className='text-red-500'>{errors.password.message}</p> : ''
              }
            <input 
            type="password" 
            className='input'
            id='password'
            {...register("password", {
              required: "You must enter a password",
              minLength: {
                value: 4,
                message: "Password must be 4 characters or more"
              },
              maxLength: {
                value: 12,
                message: "Password cannot be greater than 12 characters"
              }
            })}
            />
          </div>
          <div className='flex items-center gap-6'>
            <input type="submit" value={"Login"} className='button-lg'  />
            {
              loading && <LoaderCircle className='animate-spin' />
            }
          </div>
        </form>
        <p className='mt-3'>Don't have an account? <Link to={"/register"} className='underline'>Register</Link></p>
    </section>
  )
}

export default Login