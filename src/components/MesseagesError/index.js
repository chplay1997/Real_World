function MesseagesError(props) {
    let messages = [];
    console.log(props);
    if (props.err.hasOwnProperty('response')) {
        messages = Object.entries(props.err.response.data.errors);
    } else {
        messages = props.err;
    }
    return (
        <ul className="error-messages">
            {messages.map((mes, index) => (
                <li className="ng-binding ng-scope" key={index}>
                    {mes[0] + ' ' + mes[1]}
                </li>
            ))}
        </ul>
    );
}

export default MesseagesError;
