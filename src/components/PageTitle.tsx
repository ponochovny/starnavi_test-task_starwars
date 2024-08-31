const PageTitle = ({
	subtitle,
	title,
}: {
	subtitle: string
	title: string
}) => {
	return (
		<div className='mb-4'>
			<p className='text-slate-500 hover:text-slate-600'>{subtitle}</p>
			<h2
				id='heading'
				data-testid='heading'
				className='mt-3 text-3xl font-extrabold tracking-tight text-slate-900'
			>
				{title}
			</h2>
		</div>
	)
}

export default PageTitle
