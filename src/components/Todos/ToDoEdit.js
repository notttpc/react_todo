import React from 'react'
import Modal from 'react-bootstrap/Modal'
import ToDoForm from './ToDoForm'

export default function ToDoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header closeButton="true">
                <h3>Editing  -  {props.todo.name}</h3>
            </Modal.Header>
            <Modal.Body>
                <ToDoForm getToDos={props.getToDos} setShowEdit={props.setShowEdit} todo={props.todo} />
            </Modal.Body>
    </Modal>
  )
}