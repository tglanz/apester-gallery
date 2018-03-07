import { withProps } from 'recompose';

import hardCodedGalleryData from '../../hardcoded-data/gallery-data';

//const skipTake = (skip, take) => arr => arr.filter((_, idx) => idx >= skip && idx <= skip + take);
//const filter = skipTake(10, 1000);

/**
 * Set a property in the Component props with the gallery data.
 * Use a selector, in order to give an option to decide how it will be allocated in the props.
 * For example:
 *      const Enhanced = withGalleryData(data => ({ someProp: data }))(<Component />);
 * Result: 
 *      Enhanced is a component based on Component which have a property `someProp` which contains the gallery data
 * 
 * The benefit here is that we can always swap implementations such as redux, sagas ProviderComponent etc...
 * The component will have no difference, galleryData is just a prop for it.
 */
export default ({
    selector = galleryData => ({ galleryData }) // default value of ({ galleryData })
}) => withProps(props => selector(hardCodedGalleryData, props));