import React, {useEffect} from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';

export default function DefaultLayout() {
    const {user, token, setUser, setToken, notification} = useStateContext();
  
    if (!token) {
      return <Navigate to="/login"/>
    }
  
    const onLogout = ev => {
      ev.preventDefault()
  
      axiosClient.post('/logout')
        .then(() => {
          setUser({})
          setToken(null)
        })
    }
  
    useEffect(() => {
      axiosClient.get('/user')
        .then(({data}) => {
           setUser(data)
        })
    }, [])
  
    return (
      <div id="defaultLayout">
        <aside>
          <Link to="/products">Products</Link>
          <Link to="/bill-of-quantity">Bill of Quantity</Link>
        </aside>
        <div className="content">
          <header>
            <div>
              <h1>Product Tracker </h1>Reactjs | Laravel
            </div>
  
            <div>
              {user.name} &nbsp; &nbsp;
              <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
            </div>
          </header>
          <main>
            <Outlet/>
          </main>
          {notification &&
            <div className="notification">
              {notification}
            </div>
          }
        </div>
      </div>
    )
  }