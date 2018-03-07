/**
 * 
 */
const createSrcSet = imageInfo => Object
    .entries(imageInfo)
    .filter(([key, value]) => value.hasOwnProperty('url'))
    .map(([key, value]) => value)
    .map(({url, width}) => `${url} ${width}w`)
    .join(', ');

/**
 * Transforms an image info, as acquired in the gallery data,
 * to an image representation as needed by us.
 * Meaning { url, width, height, prominentColor }.
 * 
 * If the contract is changed, this is where we change the transformation
 */
export default ({ imageInfo, resolutionType }) => ({
    prominentColor: imageInfo.prominentColor,
    srcSet: createSrcSet(imageInfo),
    ...imageInfo[resolutionType]
});