import React from 'react'
// Below we import Formik, Field and Form to produce the form for creating/editing a cat
import { Formik, Field, Form } from 'formik'
import { catSchema } from '../../utilities/validationSchemas'
import axios from 'axios'

export default function CatForm(props) {
    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category){

            //Below we assemble a temporary object to send in our request
            const catToCreate = values

            //send 
            axios.post(`https://localhost:7019/api/Categories`, catToCreate).then((response) => {
                console.log(response)
                // Close the Create form in categories.js
                props.setShowCreate(false)
                // Refresh the Categories table to show the newly added cat
                props.getCategories()
            })
        }else {
            // Since there is a category prop, everything in this scope is "Edit Mode"
            // Because the form only captures categoryName and categoryDescription, we need
            // to pass an object into the PUT request and add in the categoryId
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }

            axios.put(`https://localhost:7019/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.getCategories()
                props.setShowEdit(false)
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                // Below is a turnary operator that makes our form behave differently based on
                // wether we have a prop called category (i.e. in Edit mode)
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : ''
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}>
            {({errors, touched}) => (
                // Form will be rendered below
                <Form id='catForm' className='row text-center m-auto'>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryName' className='form-control' placeholder='Name' />
                        {errors.catName && touched.catName &&
                            <div className="text-danger">{errors.catName}</div>
                        }
                    </div>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryDescription' className='form-control' placeholder='Description' />
                        {errors.catDesc && touched.catDesc &&
                            <div className="text-danger">{errors.catDesc}</div>
                        }
                    </div>
                    <div className="form-group m-1">
                        <button type='submit' className="btn btn-success" >
                            Submit Category to API
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}
