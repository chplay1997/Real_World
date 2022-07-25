import { useState } from 'react';

function TagList(props) {
    const [tagList, setTagList] = useState(props.tagList);
    //Handle remove tag
    const handleRemoveTag = (index) => {
        setTagList((prev) => {
            let ignore = prev[index];
            return prev.filter((item) => item !== ignore);
        });
        props.tagList.splice(index, 1);
    };
    return (
        <div className="tag-list">
            {tagList.map((tag, index) => (
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
