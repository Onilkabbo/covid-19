import React from 'react';

const Card = (props) => {
    return (
        <div className="col-4">
            <div className="octagon_card">
                <h2 className={props.class_name}>{props.value}</h2>
                <h3>{props.title}</h3>
            </div>
        </div>
    )
}

export default Card
