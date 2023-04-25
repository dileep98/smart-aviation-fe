import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { API_URL } from '../config';
import { AppContext } from '../App';
import notify from '../Utils/Toast';

const Profile = ({ onSave }) => {

  const { user, token } = useContext(AppContext);

  const [userData, SetUserdata] = useState({
    smsToggle: false,
    emailToggle: false,
    phoneNumber: ''
  })
  const [numberEdit, SetNumberEdit] = useState(true)

  useEffect(() => {
    SetUserdata(user)
  }, [user])

  const SaveHandler = (action, value) => {
    axios.put(`${API_URL}/profile/update/me`, {
      smsToggle: action === 'sms' ? value : userData.smsToggle,
      emailToggle: action === 'email' ? value : userData.emailToggle,
      phoneNumber: userData.phoneNumber
    }, {
      headers: {
        'Authorization': `Bearer ${token?.accessToken}`,
        'accept': '*/*',
        "Content-Type": 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          onSave({
            ...userData,
            smsToggle: action === 'sms' ? value : userData.smsToggle,
            emailToggle: action === 'email' ? value : userData.emailToggle,
            phoneNumber: userData.phoneNumber
          },)
          notify('Saved successfully', 's')
        }
      })
      .catch(err => {
        notify(err?.message, 'e')
        console.error(err)
      })
      .finally(() => SetNumberEdit(true))
  }

  return (
    <div>
      <h4>Profile</h4>
      <div className='card p-2'>
        <h5>Notifications</h5>
        <div className="form-check form-switch my-1">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => { SetUserdata({ ...userData, smsToggle: e.target.checked }); SaveHandler('sms', e.target.checked) }} checked={userData?.smsToggle} />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">SMS</label>
        </div>
        <div className="form-check form-switch my-1">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e) => { SetUserdata({ ...userData, emailToggle: e.target.checked }); SaveHandler('email', e.target.checked) }} checked={userData?.emailToggle} />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Email</label>
        </div>
        <h5 className='mt-3'>Phone Number</h5>
        <div className='d-flex col-6'>
          <div className='input-group'>
            <input type="tel" id="inputPassword5" className="form-control" max={15} onChange={(e) => SetUserdata({ ...userData, phoneNumber: e.target.value })} disabled={numberEdit} value={userData?.phoneNumber} />
            <span className="input-group-text cursor-pointer" id="basic-addon2" onClick={() => SetNumberEdit(false)}>Edit</span>
          </div>
          {!numberEdit && <button className='btn btn-outline-primary ms-1' onClick={SaveHandler}>Save</button>}
        </div>
      </div>
    </div>
  )
}

export default Profile