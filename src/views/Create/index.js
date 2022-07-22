import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MesseagesError from '~/components/MesseagesError';

import { UserContext } from '~/store/UserProvider';

function Create() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context.user;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tagList, setTagList] = useState([]);
    const [messages, setMessages] = useState('');

    const handleCreateArticle = (e) => {
        e.preventDefault();
        context
            .sendData({
                title,
                description,
                body,
                tagList,
                api: 'https://api.realworld.io/api/articles',
                method: 'post',
                navigate,
                path: `/`,
                token: user.token,
            })
            .then((err) => {
                setMessages(err);
                console.log(err);
            });
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
                                        value={tagList}
                                        onChange={(e) => setTagList(e.target.value.split(' '))}
                                    />
                                    <div className="tag-list"></div>
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
