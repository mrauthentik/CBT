import React from 'react'
import SideBar from '../SideBar'


const UserInfo = () => {
  return (
    <div>
        <SideBar />
      <div className='user-info'>
        <h1>Name:</h1>
        <h2>Email:</h2>
      </div>
    </div>
  )
}

export default UserInfo
