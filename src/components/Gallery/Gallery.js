import React from 'react';
import PropTypes from 'prop-types';

import './Gallery.css';
import GalleryItem from './GalleryItem';

const Gallery = ({ galleryItems, itemHeight, containerStyle }) => <div className="Gallery" style={containerStyle}>{
    galleryItems.map(item => <GalleryItem
        key={item.url}
        src={item.url}
        height={itemHeight}
        prominentColor={item.prominentColor} />)
}</div>;

Gallery.propTypes = {
    galleryItems: PropTypes.array.isRequired,
    itemHeight: PropTypes.number.isRequired,
    containerStyle: PropTypes.any.isRequired
}

export default Gallery;