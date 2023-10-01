import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { todoSchema } from '../../utilities/validationSchemas'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7019/api/Categories`).then((response) => {
            setCategories(response.data);
        });
    }, []);

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo){
            // If there is no props.resource, we are in create mode
            const todoToCreate = values

            axios.post(`https://localhost:7085/api/Resources`, todoToCreate).then(() => {
                props.setShowCreate(false)
                props.getResources()
            })
        }else {
            // If there is a props.resource, we are in Edit mode
            const todoToEdit = {
                todoId: props.todo.todoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7019/api/ToDos/${props.todo.resourceId}`, 
            todoToEdit).then(() => {
                props.setShowEdit(false)
                props.getResources()
            })
        }
    }
  return (
    <Formik
        initialValues={{
            name: props.todo? props.todo.name : '',
            
        }}
    >

    </Formik>
  )
}
