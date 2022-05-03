function Tags(props) {
  const tags = props.tagslist
  //console.log(typeof(tags));
  return tags.map(({ id, tag }) => (
    <div key={`${tag}-${id}`} id="tags">
      <button className="m-1 h-fit w-fit rounded-full bg-white p-3 dark:bg-neutral-700 dark:text-white">
        <p className="text-md font-sans">{tag}</p>
      </button>
    </div>
  ))
}

export default Tags
