"use client"
import { Form, Formik, useFormikContext } from 'formik'
import * as yup from 'yup'
import Button from './Button'
import MyField from './MyField'

export default function MyForm({ onSubmit }) {
	const initialValues = { email: '', number: '' }
	const schema = yup.object({
		email: yup.string().email('Invalid email format!').required('Enter email!')
	})

	return (
		<Formik initialValues={initialValues} onSubmit={() => { /* submit even is triggered by Button component */ }} validationSchema={schema}>
			<Form className='flex flex-col w-3/5 max-w-3xl h-2/5 bg-slate-900 rounded-3xl py-3 px-7 justify-around items-center'>
				<MyField name='email' placeholder='Enter Email' />
				<MyField name='number' placeholder='Enter Number' />
				<Button type='submit' onClick={onSubmit}>Submit</Button>
			</Form>
		</Formik>
	)
}