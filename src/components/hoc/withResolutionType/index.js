import { mapPropsStream } from 'recompose';
import createResolutionTypeStream from './createResolutionTypeStream';

/**
 * Create one and publish it, even when there will be many components using this hoc,
 * the resolution type will change uniformly, so we practicaly need just one publisher.
*/
const resolutionType$ = createResolutionTypeStream();

resolutionType$.subscribe(({ resolutionType }) => {
    console.log("Resolution type had changed", resolutionType, new Date().getTime())
})

export default () => mapPropsStream(props$ => resolutionType$.combineLatest(props$, ({ resolutionType }, props) => ({
    // The props the component will receive, keep it mostly the same, just add/update resolutionType
    ...props,
    resolutionType
})));