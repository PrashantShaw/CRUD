import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import '../styles/tableRow.css'

const TableRow = ({ member, handleDelete, setMemberEditing, setMembersToDelete }) => {

    // IF CHECKED ADD ID, IF UNCHECKED REMOVE PREVIOUSLY ADDED ID
    const handleChecked = (e) => {
        const isChecked = e.target.checked
        setMembersToDelete(rest => {
            if (isChecked) {
                return [...rest, member.id]
            }
            else {
                const uncheckedRemovedArr = rest.filter(id => id !== member.id)
                return [...uncheckedRemovedArr]
            }
        })
    }
    // RETURN JSX
    return (
        <tr>
            <td>
                <input type="checkbox" onClick={handleChecked} />
            </td>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>{member.role}</td>
            <td>
                <BiEdit
                    className='edit-icon'
                    onClick={() => { setMemberEditing(member) }}
                />
                <AiOutlineDelete
                    className='delete-icon'
                    onClick={() => { handleDelete(member.id) }}
                />
            </td>
        </tr>
    )
}

export default TableRow