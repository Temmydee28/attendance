import React from 'react'
import '../App.css'
import '../styles/profile.css'
import Sidebar from './Sidebar';
import UserImg from '../Asset/user.jpg'

function Profile() {
  return (
    <div className="App">
        <Sidebar />
        <div className="Profile">
          <div className="profile-wrapper">
          <img src={UserImg} alt="" />
                <div className="profile-title">
                    <span>Hello,</span>
                    <h2>Martins</h2>
                    </div>
            </div>
        </div>

    </div>
  )
}

export default Profile;