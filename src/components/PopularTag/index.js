import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '~/store/UserProvider';

function PopularTag(props) {
    const context = useContext(UserContext);
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(`https://api.realworld.io/api/tags`, {
                headers: {
                    'Content-type': '/application/json',
                    authorization: 'Token ' + (localStorage.getItem('jwtToken') || ''),
                },
            });
            setTagList(data.data.tags);
        };
        getData();
    }, []);

    const handleShowTag = (e) => {
        e.preventDefault();
        if (props.tag === e.target.innerHTML) {
            return;
        }
        props.setTag(e.target.innerHTML);
        context.setMessage(e);
    };
    return (
        <div className="col-md-3">
            <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                    {tagList.length === 0
                        ? 'Loading tags...'
                        : tagList.map((tag, index) => (
                              <Link key={index} to="" className="tag-pill tag-default" onClick={handleShowTag}>
                                  {tag}
                              </Link>
                          ))}
                </div>
            </div>
        </div>
    );
}

export default PopularTag;
