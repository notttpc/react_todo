import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CatForm from './CatForm'

export default function CatEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.seShowEdit(false)}
        size='lg'>
        <Modal.Header closeButton>
            <h2>Editing {props.category.catName}</h2>
        </Modal.Header>
        <Modal.Body>
            <CatForm
                category={props.category}
                getCategories={props.getCategories}
                setShowEdit={props.setShowEdit} />
        </Modal.Body>
    </Modal>
  )
}