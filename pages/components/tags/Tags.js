function Tags(props){
    const tags = props.tagslist;
    //console.log(typeof(tags));
    return(
        <div className="scrollbar-hide overflow-y-auto overflow-x-hidden h-48 flex flex-wrap ">
            {tags.map((elmt, index) => (
            <div className="music-tags w-48 flex cursor-pointer font-sans text-lg select-none px-5 bg-transparent h-14 text-emerald-900 hover:text-black hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 rounded-lg hover:shadow-md hover:shadow-black-600 item-center " key={`${elmt}-${index}`}>
                <button>{elmt.tags}</button> 
               
            </div>
            ))}
        </div>
    )
};

export default Tags;