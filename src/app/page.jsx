"use client"
import { useState } from 'react'
import MyForm from './components/form/MyForm'
import SearchResult from './components/SearchResult'

export default function Home() {
	const [searchResult, setSearchResult] = useState()

	const pendingForms = new WeakMap()

	const handleSubmit = (form, formikProps) => {
		formikProps.setSubmitting(true)

		// get AbortController from WeakMap and abort if it exists
		const previousController = pendingForms.get(form)
		if (previousController) previousController.abort()

		// create new AbortController and save in WeakMap
		const controller = new AbortController()
		pendingForms.set(form, controller)

		// save values to FormData object
		const formData = new FormData()
		Object.entries(formikProps.values).forEach(([field, value]) => {
			const formattedValue = field === 'number' ? value.replace(/-/g, '') : value
			formData.set(field, formattedValue)
		})

		// send data to the server
		fetch(`/api/search?${new URLSearchParams(formData)}`, { signal: controller.signal })
			.then(async (response) => {
				if (response.status === 204) { return setSearchResult('Nothing found!') }
				const result = await response.json()
				setSearchResult(result)
			})
			.catch(error => console.error(error))
			.finally(() => {
				formikProps.setSubmitting(false)
				pendingForms.delete(form)
			})
	}

	return (
		<>
			<MyForm onSubmit={handleSubmit} />
			{searchResult && <SearchResult data={searchResult} />}
		</>
	)
}