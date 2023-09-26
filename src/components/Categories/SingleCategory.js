import React, { useState } from 'react'
//Our edit and delete buttons use icons from Font Awesome. We access those icons via
// the React Icons npm package (npm install react-icons)
import { faTrash, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

export default function SingleCategory(props) {
    const { catName, catDesc, categoryId } = props.category

  const { currentUser } = useAuth()
  // Below is the hook that shows/hides the edit form
  const [showEdit, setShowEdit] = useState(false);

  // Delete functionality below
  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${catName}`)) {
      axios.delete(`https://localhost:7019/api/Categories/${id}?`).then(() => {
        props.getCategories()
      })
    }
  }

  return (
    <tr>
        <td>{catName}</td>
        <td>{catDesc}</td>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <td>
            <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(categoryId)}>
              <FaTrashAlt />
            </button>
          </td>
        }
    </tr>
  )
}
