

/* This is what we need for category POST...These are inputs we need in the form. 
    {
        "categoryName": "Test",
        "categoryDescription": "Test desc"
    }
*/
import * as Yup from "yup"

const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated and use Yup to define
    //the requirements for each property (required, maxLength, etc.)
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 characters').required('Required')
})

const resourceSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 characters').required(),
    done: Yup.bool().required(),
    categoryId: Yup.number().required()
})

export { catSchema, resourceSchema }