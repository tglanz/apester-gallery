import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

import { compose, withProps } from 'recompose';
import withPersistentImage from '../hoc/withPersistentImage';

const GalleryItem = ({ src, height, width, prominentColor }) => <div>
    <LazyLoad
            overflow
            once
            resize
            height={height}
            offset={height * 10}>

            <img
                /* srcSet={srcSet} */ src={src}
                alt="a gallery item"
                height={height} width={width}
                style={{ backgroundColor: prominentColor }}/>
    </LazyLoad>
</div>

GalleryItem.propTypes = {
    src: PropTypes.string,
    height: PropTypes.number.isRequired,
    prominentColor: PropTypes.string.isRequired
}

export default compose(
    withPersistentImage({ imageSrcProp: 'src' }),
    withProps(({ height }) => ({ width: height })) // Give a width, exactly like the height
)(GalleryItem);