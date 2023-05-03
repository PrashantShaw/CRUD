import React from 'react'
import '../styles/editModal.css'

const EditMOdal = ({ member, setMemberEditing, handleEditSave }) => {

    const handleOnChange = (e) => {
        const key = e.target.name
        const val = e.target.value
        setMemberEditing(prev => {
            return { ...prev, [key]: val }
        })
    }
    return (
        <div className="modal-conatiner">
            <div className='edit-modal'>
                <input type="text" value={member.name} name='name' onChange={handleOnChange} />
                <input type="text" value={member.email} name='email' onChange={handleOnChange} />
                <input type="text" value={member.role} name='role' onChange={handleOnChange} />
                <button onClick={handleEditSave}>Save</button>
            </div>
        </div>
    )
}

export default EditMOdal