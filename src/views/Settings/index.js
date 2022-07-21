import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSetting from '~/components/FormSetting';

import { UserContext } from '~/store/UserProvider';

function Settings() {
    const navigate = useNavigate();
    const context = useContext(UserContext);

    //Handle logout
    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        context.setUser(null);
        navigate('/');
    };
    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <FormSetting />

                        <hr />
                        <button className="btn btn-outline-danger" onClick={handleLogOut}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
