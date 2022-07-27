function TagList(props) {
    //Handle remove tag
    const handleRemoveTag = (index) => {
        props.setTagList((prev) => {
            let ignore = prev[index];
            return prev.filter((item) => item !== ignore);
        });
    };

    return (
        <div className="tag-list">
            {props.tagList.map((tag, index) => (
                <span key={index} className="tag-default tag-pill ng-binding ng-scope">
                    <i
                        className="ion-close-round"
                        onClick={() => {
                            handleRemoveTag(index);
                        }}
                    />
                    {tag}
                </span>
            ))}
        </div>
    );
}

export default TagList;
