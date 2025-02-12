import SideBar from '../SideBar'


const UserInfo = () => {
  return (
    <div className='user-info'>
        <SideBar />
      <div className='user-info-container'>
        <h3>Name:</h3>
        <h3>Email:</h3>
      </div>
    </div>
  )
}

export default UserInfo
