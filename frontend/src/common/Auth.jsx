import React, { useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerAPI } from '../services/allAPI.JS'
import { loginAPI } from '../services/allAPI.JS'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { googleAuthAPI } from '../services/allAPI.JS'
import { routeContext } from '../contextShare/RouteGuardContext'


function Auth({ insideRegister }) {
  // console.log(insideRegister);
  const navigate = useNavigate()
  const {role,setRole,authorizedUser,setAuthorizedUser} = useContext(routeContext)

  const form = useFormik({
    // initial values
    initialValues: {
      username: "",
      email: "",
      password: ""
    },

    //validation
    validationSchema: Yup.object({
      username: insideRegister && Yup.string().min(3, "Must be atleast 3 charachters").required("Username required"),
      email: Yup.string().email("Invalid email").required('Email required'),
      password: Yup.string().required("Password required")
    }),

    //submit
    onSubmit: (values) => {
      console.log(values);
      if (insideRegister) {
        console.log("Register API call");
        handleRegister(values)

      } else {
        console.log('Register login call');
        handleLogin(values)
      }

    }
  })

  const handleRegister = async (userData) => {
    try {
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status == 201) {
        toast.success("Register Successful")
        form.resetForm()

        navigate("/login")
      } else {
        toast.error('Something went wrong')
        console.log("error");

      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (userData) => {
    try {
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status == 200) {
        // alert("Login Successful")
        toast.success("Login success")
        sessionStorage.setItem("user", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        form.resetForm()
        if (result.data.user.role == "admin") {
          setRole("admin")
          navigate("/admindashboard")
        } else {
          setRole("user")
          navigate("/")
        }
      } else if (result.status === 409) {
        toast.error("Invalid credentials")
      } else if (result.status === 400) {
        toast.error('Account does not exist, please register')
      } else {
        toast("Something went wrong")
      }

    } catch (error) {
      console.log(error);

    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    const decodeJWT = jwtDecode(credentialResponse.credential)
    const { email, name, picture } = decodeJWT
    console.log(decodeJWT);
    const result = await googleAuthAPI({ email, username: name, profileImage: picture })
    console.log(result);
    if (result.status == 200) {
      // alert("Login Successful")
      toast.success("Login success")
      sessionStorage.setItem("user", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      form.resetForm()
      if (result.data.user.role == "admin") {
        navigate("/admindashboard")
      } else {
        navigate("/")
      }
    } else if (result.status === 409) {
      toast.error("Invalid credentials")
    } else {
      toast("Something went wrong")
    }
  }
  return (

    <>
      <div className="w-full h-screen flex flex-col justify-center items-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1741851374666-1bc849a293c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>

        <div className='w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)]'>
          <h1 className='text-white font-bold text-6xl my-5' >BOOKSTORE</h1>
          <form onSubmit={form.handleSubmit} className="flex flex-col -center bg-slate-950 min-w-110 p-10 rounded-3xl  text-slate-300">
            <div>
              <div className='p-5 rounded-full flex justify-center '>
                <div className='border-5 p-5 rounded-full text-6xl'>
                  <FaUser className='' />
                </div>
              </div>
            </div>
            {
              insideRegister ?
                <>
                  <h1 className='text-center text-4xl py-5 font-bold' >Register</h1>

                </>
                :
                <h1 className='text-center text-4xl py-5 font-bold' >Login</h1>
            }

            {
              insideRegister && <div className="flex flex-col">
                <label className='my-3' htmlFor="">Username</label>
                <input name='username' value={form.values.username} onChange={form.handleChange} type="text" className='border rounded-2xl py-2 mb-5 placeholder:text-slate-500 placeholder:text-center text-center' placeholder='Enter username' />
                {form.errors.username && <div className="text-yellow-500">{form.errors.username}</div>}
              </div>
            }


            <label className='my-3' htmlFor="">Email</label>
            <input name='email' value={form.values.email} onChange={form.handleChange} type="text" className='border rounded-2xl py-2 mb-5 placeholder:text-slate-500 placeholder:text-center text-center' placeholder='Enter email' />
            {form.errors.email && <div className="text-yellow-500">{form.errors.email}</div>}
            <label className='my-3' htmlFor="">Password</label>
            <input name='password' value={form.values.password} onChange={form.handleChange} type="password" className='border rounded-2xl py-2 mb-1 placeholder:text-slate-500 placeholder:text-center text-center' placeholder='Enter password' />
            {form.errors.password && <div className="text-yellow-500">{form.errors.password}</div>}
            <p className='mb-5'>*Never share your password with others</p>
            <button type='submit' className='bg-slate-700 p-3 rounded-2xl cursor-pointer text-xl mb-4'>
              {
                insideRegister ? <>Register</> : <>Login</>
              }
            </button>
            {
              !insideRegister ? <Link to={"/register"} className='text-center' >Dont have an account? <u className='text-blue-500'>Register Now</u></Link>
                :
                <Link to={"/login"} className='text-center' >Already have an account? <u className='text-blue-500'>Login</u></Link>
            }
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                handleGoogleLogin(credentialResponse)
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </form>
          {/* google */}

        </div>



      </div>

    </>
  )
}

export default Auth