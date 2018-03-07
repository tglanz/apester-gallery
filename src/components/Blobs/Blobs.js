import React from 'react';
import PropTypes from 'prop-types';
import './Blobs.css';

/*
    This is an animation of two blobs with a given image (imageSrc).
    It was taken from apester code pen animation at https://codepen.io/benkalsky/pen/gwArAL,
    and was reactified
*/

const Blobs = ({ imageSrc }) => <div className="Blobs">
    <div className="blob" />
    <div className="blob" />
    
    <div className="image-container">
        <img src={imageSrc} alt="blob stuff" />
    </div>
</div>

Blobs.propTypes = {
    imageSrc: PropTypes.string.isRequired
}

export default Blobs;