// SignupPage.js

import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


function Signup() {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
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

        if(password !== cpassword){
          return Swal.fire({
            title: 'Error!',
            text: 'Passwords do not match with each other!',
            icon: 'error'
          })
        }
        
        const response = await fetch('http://localhost:8000/api/auth/createuser',
        {
          method:"POST",
          headers:{
            'Content-Type': "application/json"
          },
          body: JSON.stringify({name,email,password})
        })
         
        const res = await response.json();

        if(res.success){
          Swal.fire({
            title: 'Success!',
            text: 'Successfully signed in!',
            icon: 'success'
          })
          localStorage.setItem('token',res.authToken);
          navigate('/login');
        }

        else if(res.error === 'Sorry a user with this email already exists'){
          return Swal.fire({
            title: 'Error!',
            text: res.error,
            icon: 'error'
          })
        }

        else{
          return Swal.fire({
            title: 'Error!',
            text: 'Something went wrong',
            icon: 'error'
          })
        }
     }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    } 

  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg w-[75%]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" onChange={onChange} id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" onChange={onChange} required id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" onChange={onChange} required minLength={5} id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" onChange={onChange} required minLength={5} id="confirmPassword" name="cpassword" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" className="btn w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
