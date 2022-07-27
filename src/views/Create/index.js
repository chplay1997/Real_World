import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MesseagesError from '~/components/MesseagesError';
import TagList from '~/components/TagList';

import { UserContext } from '~/store/UserProvider';

function Create() {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(UserContext);
    const user = context.user;

    const [title, setTitle] = useState(location.state ? location.state.title : '');
    const [description, setDescription] = useState(location.state ? location.state.description : '');
    const [body, setBody] = useState(location.state ? location.state.body : '');
    const [tagListInput, setTagListInput] = useState('');
    const [tagList, setTagList] = useState(location.state ? location.state.tagList : []);
    const [messages, setMessages] = useState('');

    //handle click submit
    const handleCreateArticle = (e) => {
        e.preventDefault();

        let api = location.state
            ? `https://api.realworld.io/api/articles/${location.state.slug}`
            : 'https://api.realworld.io/api/articles';

        //Filler tag is empty
        let tagListAll = tagListInput ? tagListInput.split(' ').filter((item) => item !== '') : [];
        tagListAll = tagList ? tagListAll.concat(tagList) : tagListAll;

        context
            .sendData({
                title,
                description,
                body,
                tagList: tagListAll,
                api: api,
                method: location.state ? 'put' : 'post',
                navigate,
                path: '/',
                token: user.token,
            })
            .then((err) => {
                setMessages(err);
                console.log(err);
            });
    };

    //handle Key Down view tag
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            console.log(e.target.value.split(' ').filter((item) => item !== ''));
            setTagList((prev) => {
                return [...prev, ...e.target.value.split(' ').filter((item) => item !== '')];
            });
            setTagListInput('');
        }
    };
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <div className="ng-isolate-scope">{messages ? <MesseagesError err={messages} /> : ''}</div>

                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="What's this article about?"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control"
                                        rows="8"
                                        placeholder="Write your article (in markdown)"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        value={tagListInput}
                                        onChange={(e) => {
                                            setTagListInput(e.target.value);
                                        }}
                                        onKeyDown={handleKeyDown}
                                    />

                                    {<TagList tagList={tagList} setTagList={setTagList} />}
                                </fieldset>
                                <button
                                    className="btn btn-lg pull-xs-right btn-primary"
                                    type="button"
                                    onClick={handleCreateArticle}
                                >
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
