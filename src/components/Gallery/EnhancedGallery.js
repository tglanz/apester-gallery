import { compose } from 'recompose';

import Gallery from '../Gallery/Gallery';

import withGalleryData from '../hoc/withGalleryData';
import withListVirtualization from '../hoc/withListVirtualization';
import withResolutionType from '../hoc/withResolutionType';

export default compose(

    withResolutionType(),

    withGalleryData({
        selector: (items, props) => ({
            items: items.map(item => ({
                ...item[props.resolutionType],
                prominentColor: item.prominentColor
            })),

            /**
             * Calculate the item height for all items based on the maximum height.
             * I initially wanted to do it by the min value (shrink rather than stretch),
             * but it didn't reflect the resolution changes nicely
             */
            itemHeight: items.reduce((height, currentItem) => {
                const currentItemHeight = currentItem[props.resolutionType].height;
                return currentItemHeight > height ? currentItemHeight : height;
            }, 0)
        })
    }),

    withListVirtualization(({
        virtual, itemHeight    
    }) => ({
        galleryItems: virtual.items,
        containerStyle: virtual.style,
        itemHeight
    })),

)(Gallery);