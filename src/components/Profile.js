import React from 'react'

const Profile = () => {
  return (
    <div>
      <h4>Profile</h4>
      <div className='card p-2'>
        <h5>Notifications</h5>
        <div className="form-check form-switch my-1">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">SMS</label>
        </div>
        <div className="form-check form-switch my-1">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked/>
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Email</label>
        </div>
      </div>
    </div>
  )
}

export default Profile