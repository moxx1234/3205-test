import { useFormikContext } from "formik"

const Button = ({ children, onClick }) => {
	const formikProps = useFormikContext()
	const { errors, touched, isSubmitting } = formikProps
	const disabled = !!Object.keys(errors).length && Object.values(touched).every(touched => !!touched) || isSubmitting
	return (
		<button
			className='bg-gray-800 hover:bg-gray-500 disabled:opacity-50 disabled:hover:bg-gray-800 disabled:cursor-auto transition rounded max-w-xs py-3 px-10 cursor-pointer'
			disabled={disabled}
			onClick={(e) => onClick(e.target.closest('form'), formikProps)}
			type="submit"
		>
			{children}
		</button>
	)
}

export default Button