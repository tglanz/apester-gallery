# Gallery

### Run the project
```npm install```   - Install dependencies  
```npm start```     - Run dev server at <http://localhost:3000>  

### Notes

Have tried using an hoc design for the implementation, with modification flexibility in mind.  
For example, in order to NOT use image persistency -  The code below (At GalleryItem.js)
```
export default withPersistentImage({
    imageSrcProp: 'src'
})(GalleryItem);
```
should be transformed to  
```export default GalleryItem;```  
We basicaly wrapped a thin, visual component, with some logic.  
Alternatively, we could change the specific implementation detail inside 'withPersistentImage' without the GalleryItem component knowing about it.  
Or event transition to redux completely (The redux connect method is itself an hoc, nothing different here).

### Issues

When scrolling, the images apear (could be smoother). Probably because of the list virutalization, the lazy loading have a hard time calculating the location and offset correctly, and there isn't actually dom to be rendered (The list have only the required number of dom elements).  

Resolution changes are according to width, hardcoded, specificaly i have adapted it to change when my mobile screen rotate (low/standard).  
Not sure this is the correct approach though..
