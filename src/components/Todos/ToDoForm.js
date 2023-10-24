import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { todoSchema } from '../../utilities/validationSchemas'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`http://todoapi.blakemharrison.com/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if (!props.todo) {
            const newToDo = {
                name: values.name,
                done: false,
                categoryId: values.categoryId
            }

            axios.post(`http://todoapi.blakemharrison.com/api/ToDos`, newToDo).then(() => {
                props.getToDos()
                props.setShowCreate(false)
            })
        }
        else {
            const taskToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                done: props.todo.done,
                categoryId: values.categoryId
            }

            axios.put(`http://todoapi.blakemharrison.com/api/ToDos/${props.todo.toDoId}`, taskToEdit).then(() => {
                console.log()
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',
            done: props.todo ? props.todo.done : false,
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='toDoForm'>
                <div className="form-group m-3">
                    <Field name='name' className='form-control' placeholder='New Task' />
                    {errors.name && touched.name ? (
                        <div className="text-danger">{errors.name}</div>
                    ) : null}
                </div>
                <div className="form-group m-3">
                    <Field name='categoryId' as='select' className='form-control'>
                        <option value='' disabled>[--Choose a Category--]</option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>    
                        )}
                    </Field>
                </div>
                <div className="form-group text-center m-3">
                    <button className="btn btn-success m-3" type='submit'>Submit Task to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
