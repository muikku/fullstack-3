import React from 'react';

const Notification = ({message, id}) => {
    return(
        {content: <div key={id} className="notification">
        {message}
        </div>,
         show: true, id: id}
    
    )
}



export default Notification;