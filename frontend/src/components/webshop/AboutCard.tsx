
function AboutCard(props: any) {

    return (
        <div className='w-[80%] h-max p-3 ml-auto border border-border rounded-md hover:bg-muted cursor-help'>
            <h3 className='font-bold text-right'>{props.name}</h3>
            <p className='text-gray-500 text-right'>{props.description}</p>
        </div>
    )
}

export default AboutCard
