import React from "react";

const GamePreview = ({ name, logoUrl }) => (
    <div style={{padding: '5px', height: '250px',border: '1px solid grey', display: 'grid', gridTemplateRows: '80% 20%', placeItems: 'center'}} >
        <img style={{ width: '100%', height: '100%', objectFit: 'contain'}} alt={name} src={logoUrl} />
        <span>{ name }</span>
    </div>
)

export default GamePreview;