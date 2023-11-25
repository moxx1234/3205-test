

const SearchResult = ({ data }) => {
	return (
		<div className="bg-slate-900 rounded-3xl p-7 w-3/5 max-w-3xl mt-4">
			{typeof data === 'string' ?
				<div>{data}</div>
				:
				<ol>
					{data.map(({ email, number }, index) => (
						<li key={index} className="last:mb-0 mb-3">
							<p>{index + 1}. email: {email} - number: {number}</p>
						</li>
					))}
				</ol>}
		</div>
	)
}

export default SearchResult