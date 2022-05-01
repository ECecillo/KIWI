function Tags(props) {
    const tags = props.tagslist;
    //console.log(typeof(tags));
    return (
        tags.map(({id, tag} ) => (
            <div key={`${tag}-${id}`} id="tags">
                <button className="bg-white dark:bg-neutral-700 dark:text-white rounded-full w-fit h-fit p-3 m-1">
                    <p className="font-sans text-md">{tag}</p>
                </button>
            </div>
        ))
    )
};

export default Tags;