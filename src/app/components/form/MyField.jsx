import { Field, useField } from "formik"

const MyField = (props) => {
	const [field, meta, helpers] = useField(props)

	const handleChange = (e) => {
		let resultValue = e.target.value.replace(/[^-^\d]/g, '')
		const matches = resultValue.match(/\d{1,2}/g)
		resultValue = !matches ? resultValue : matches.join('-')
		helpers.setValue(resultValue)
	}

	return (
		<div className='self-stretch flex flex-col'>
			<Field
				className={`rounded p-2 text-black self-stretch ${meta.error && meta.touched && ' border-2 border-red-700'}`}
				{...props}
				onChange={field.name === 'number' ? handleChange : field.onChange}
			/>
			{meta.error && meta.touched && <p className=' text-red-700'>{meta.error}</p>}
		</div>
	)
}

export default MyField