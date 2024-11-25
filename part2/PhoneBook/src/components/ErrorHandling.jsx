const ErrorMessage = ({ message }) => {
    const errorStyling = {
        color: 'red',
        backgroundColor: 'lightgray',
        borderRadius: '10px',
        border: '2px solid red',
        fontSize: '20px',
        padding: '10px',
    }

    if(message == null) {
        return null
    }

    return (
        <div style={errorStyling}>
            {message}
        </div>
    )
}

export default ErrorMessage