import data from '@/data.json'
import { NextRequest } from 'next/server'
import { setTimeout } from 'timers/promises'

type Item = {
	email: string,
	number: string
}
type Data = Item[]

export const GET = async (req: NextRequest) => {
	const url = new URL(req.url)
	const [email, number] = url.searchParams.values()
	const searchedData: Data = data.filter(item => item.email === email || item.number === number)
	await setTimeout(5000)

	if (!searchedData.length) return new Response(null, { status: 204 })

	return Response.json(searchedData)
}