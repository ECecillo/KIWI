function DisplayGrid(props) {
  const blocks = props.elements
  console.log(blocks) //DEBUG
  return (
    <div className="flex h-3/5 flex-wrap justify-center overflow-y-auto bg-pink-500 scrollbar-hide">
      {blocks.map((elmt, index) => (
        <div
          className="m-2 flex h-fit w-32 flex-col items-center rounded-2xl bg-white p-2"
          key={`${elmt}-${index}`}
        >
          <img
            src={elmt.images[0].url}
            className="aspect-square rounded-2xl"
          ></img>
          <p className="w-full overflow-hidden truncate text-center">
            {elmt.name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default DisplayGrid
