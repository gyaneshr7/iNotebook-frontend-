// LoginPage.js

import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'



function Login() {
  const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();

    useEffect(() => {
      const handleAuth = async () => {
        const isLoggedIn = localStorage.getItem("token");
        console.log(isLoggedIn);
        if (isLoggedIn !== null) {
          navigate("/dashboard");
        }
      };
  
      handleAuth();
    }, []);

     const handleSubmit = async (e) => {
        e.preventDefault();

        const {name,email,password,cpassword} = credentials;
        
        const response = await fetch('http://localhost:8000/api/auth/login',
        {
          method:"POST",
          headers:{
            'Content-Type': "application/json"
          },
          body: JSON.stringify({email,password})
        })
         
        const res = await response.json();

        if(res.success){
          Swal.fire({
            title: 'Success!',
            text: 'Successfully logged in!',
            icon: 'success'
          })
          localStorage.setItem('token',res.authToken);
          navigate('/dashboard');
        }

        else{
          return Swal.fire({
            title: 'Error!',
            text: res.error,
            icon: 'error'
          })
        }
     }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    } 



  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input onChange={onChange} type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input onChange={onChange} type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" className="btn w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
