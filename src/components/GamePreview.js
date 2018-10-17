import React from "react";
import PropTypes from 'prop-types';

const contentDivStyles = {
    padding: '5px',
    height: '250px',
    border: '1px solid grey',
    display: 'grid',
    gridTemplateRows: '80% 20%',
    placeItems: 'center'
};

const logoImgStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
}

const GamePreview = ({ name, logoUrl }) => (
    <div style={contentDivStyles} >
        <img style={logoImgStyles} alt={name} src={logoUrl} />
        <span>{ name }</span>
    </div>
)

GamePreview.propTypes = {
    name: PropTypes.string,
    logoUrl: PropTypes.string,
};


export default GamePreview;