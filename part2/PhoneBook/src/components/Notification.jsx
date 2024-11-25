const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        padding: '10px',
        border: 'solid 2px green',
        borderRadius: '10px',
        fontSize: '20px',
        backgroundColor: 'lightgray',
    }

    if(message == null) {
        return null
    }

    return(
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification