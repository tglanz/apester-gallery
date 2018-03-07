import React from 'react';
import Dexie from 'dexie';

import fetchImage from './fetchImage'

const db = new Dexie("apester-gallery");
db.version(1).stores({ images: "++url, data" })
/**
 * This hoc manages the lifecycle of an image that could/should be stored in the disk.
 * 
 * More specificaly it is stored IndexeDB using the Dexie framework, but only this hoc knows it,
 * so any implementation details can be changed only here without breaking some other stuff...
 * 
 * This hoc gets the property in which the image src is,
 * tries to get it from cache and/or web, and changes the underlying src prop of the lower order component.
 * 
 * For example
 * (src=image.jpg => in cache - { image.jpg: "some base64 data" } => src="some base64 data")
 * (src=image.jpg => image.jpg not in cache => get it and update cache => src="some base64 data")
 * 
 * The process is asyncronous, so while there isn't a result, the passed src prop is undefined.
 * The lower order component, will always get a ready, base64 image data.
 * 
 * Alternative approach for this hoc is using mapPropsStream of recompose.
 */
export default ({
    imageSrcProp
}) => LowerOrderComponent => class extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            calculatedImageSrc: undefined
        };
    }

    componentDidMount(){

        const self = this;

        /**
         * Messy stuff...
         * Basicaly, Try to load an image data from disk, if it doesn't exit,
         * acquired it, and save it's raw format in the disk.
         */
        (async function(){

            const initialImageSrc = self.props[imageSrcProp];

            let imageUrl = initialImageSrc;

            try {
                const result = await db.images.get(initialImageSrc);
                
                if (result === undefined){
                    throw new Error("Empty key");
                }

                imageUrl = result.data;
            } catch (error) {
                
                try {
                    imageUrl = await fetchImage(initialImageSrc);
                    
                    try {
                        await db.images.put({ url: initialImageSrc, data: imageUrl });
                    } catch (e){
                        // Logging and stuff could be nice here
                    }
                } catch (fetchError){
                    console.error(initialImageSrc);
                }
            } finally {
                self.setState({ calculatedImageSrc: imageUrl });
            }
        }());

    }

    render(){
        const childProps = {
            ...this.props,
            [imageSrcProp]: this.state.calculatedImageSrc
        };

        return <LowerOrderComponent {...childProps} />
    }
};