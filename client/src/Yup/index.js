import * as yup from 'yup'


export const formSchema = yup.object().shape({
    bill: yup
        .string()
        .required('This Field is Required'),
    tip: yup
        .string()
        .required('This Field is Required'),
    numberOfPeople: yup
        .string()
        .required('This Field is Required')
})