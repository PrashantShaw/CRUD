import React, { useMemo, useState } from 'react'
import membersData from '../members.json'
import TableRow from './TableRow'
import '../styles/home.css'
import EditMOdal from './EditMOdal'

const Home = () => {
  // STATES
  const [members, setMembers] = useState(membersData)
  const [pageNo, setPageNo] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [memberEditing, setMemberEditing] = useState(null)
  const [membersToDelete, setMembersToDelete] = useState([])

  // FILTER BASED ON SEARCH TEXT
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      return (
        member.name.toLowerCase().includes(searchText) ||
        member.email.toLowerCase().includes(searchText) ||
        member.role.toLowerCase().includes(searchText)
      )
    })
  }, [searchText, members])

  // ADD PAGINATION
  const membersToShow = useMemo(() => {
    return filteredMembers.slice(
      (pageNo * 10), (pageNo * 10 + 10)
    )
  }, [pageNo, filteredMembers])

  // HANDLE SINGLE DELETE
  const handleDelete = (id) => {
    const updatedMembersList = members.filter(mem => mem.id !== id)
    setMembers(updatedMembersList)
  }

  // HANDLE PAGE CHANGE
  const increasePgCount = () => {
    if (pageNo < ~~((members.length - 1) / 10)) {
      setPageNo(prev => prev + 1)
    }
  }
  const decreasePgCount = () => {
    if (pageNo > 0) {
      setPageNo(prev => prev - 1)
    }
  }

  // HANDLE EDIT 
  const handleEditSave = () => {
    const updatedMembersList = members.map(member => {
      if (member.id === memberEditing.id) {
        return memberEditing
      }
      return member
    })
    setMembers([...updatedMembersList])
    setMemberEditing(null)
  }

  // HANDLE MULTI DELETE
  const handleMultiDelete = () => {
    const updatedMembersList = members.filter(member => !membersToDelete.includes(member.id))
    setMembers([...updatedMembersList])
  }

  // RETURN JSX
  return (
    <div className='container'>
      <div className="search">
        <input
          type="text"
          placeholder='search by name, email or roll'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      <div className="members-list">
        <table>
          <thead>
            <tr>
              <th>select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              membersToShow.map(member => {
                return <TableRow
                  key={member.id}
                  member={member}
                  handleDelete={handleDelete}
                  setMemberEditing={setMemberEditing}
                  setMembersToDelete={setMembersToDelete}
                />
              })
            }
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className='prev-btn' onClick={decreasePgCount}>PREV</button>
        <span>{pageNo + 1}</span>
        <button className='next-btn' onClick={increasePgCount}>NEXT</button>
      </div>
      {memberEditing &&
        <EditMOdal
          member={memberEditing}
          setMemberEditing={setMemberEditing}
          handleEditSave={handleEditSave}
        />}
      <button className='multi-delete' onClick={handleMultiDelete}>Delete Selected</button>
    </div>
  )
}

export default Home