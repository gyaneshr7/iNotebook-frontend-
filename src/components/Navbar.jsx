import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch('http://localhost:8000/api/auth/getuser', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const user = await data.json();
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/');
  }

  return (
    <div className='w-[100vw] text-xl h-20 text-white fixed top-0 flex items-center gap-2 justify-between p-5 bg-purple-500'>
      <div className='flex gap-10'>
        <Link to={'/dashboard'}>Add Note</Link>
        <Link to={'/notes'}>Your Notes</Link>
      </div>
      <div className='flex items-center gap-2 relative'>
        <div className='cursor-pointer'>
          <FaUser />
        </div>
        <div className='p-2'>{user.name}</div>
        <div className='p-4 hover:bg-purple-900 hover:rounded-md hover:cursor-pointer' onClick={handleLogout}>Log Out</div>
      </div>
    </div>
  );
};

export default Navbar;
