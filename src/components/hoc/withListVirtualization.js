import { compose, mapProps } from 'recompose';
import VirtualList from 'react-virtual-list';

/**
 * hoc which takes a component and virtualize it using our used virtualized list framework.
 * we want to do it in order to decouple the lower order component implementation from the virtualization framework implementation.
 * i.e props such as `virtual` doesn't make any sense in Gallery component.
 * 
 * we implement it by acquiring a selector from the Virtual props to the props passed to the lower order component
 */
export default selector => compose(
    VirtualList(),                  // We can compose it because the framework made it as an hoc :)
    mapProps(selector)
);