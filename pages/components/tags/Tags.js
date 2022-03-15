function Tags(props){
    const tags = props.tagslist;
    return(
        <div id="tags" className="">
            {tags.map((elmt, index) => (
                <button className="bg-white rounded-full w-fit h-fit p-3 m-1">
                    <p className="font-sans text-md">{elmt.tag}</p>
                </button>
            ))}
        </div>
    )
};

export default Tags;