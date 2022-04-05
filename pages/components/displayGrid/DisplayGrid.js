
function DisplayGrid(props){
    const blocks = props.elements
    console.log(blocks);            //DEBUG
    return(
        <div className="flex flex-wrap justify-center h-3/5 overflow-y-auto scrollbar-hide bg-pink-500">
            {blocks.map((elmt, index) => (
                <div className="flex flex-col h-fit items-center rounded-2xl bg-white m-2 p-2 w-32" key={`${elmt}-${index}`}>
                    <img src={elmt.images[0].url} className="rounded-2xl aspect-square"></img>
                    <p className="w-full overflow-hidden truncate text-center">{elmt.name}</p>
                </div>
            ))}
        </div>
    )
}

export default DisplayGrid;