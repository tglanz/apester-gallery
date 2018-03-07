import { BehaviorSubject } from 'rxjs';

const resolutionTypes = {
    standard: "standard_resolution",
    low: "low_resolution",
    thumbnail: "thumbnail"
};

const getResolutionType = () => {
    if (window.innerWidth < 400){
        return resolutionTypes.thumbnail;
    } 
    
    if (window.innerWidth < 800) {
        return resolutionTypes.low;
    }

    return resolutionTypes.standard;
}

export default () => {
    // Use behavior subject, there is one, current, value which will act as the resolution type state.
    const resolutionType$ = new BehaviorSubject({
        // wrap the event as payload, keep it flexible for changes
        resolutionType: getResolutionType()
    });

    window.addEventListener("resize", () => {
        resolutionType$.next({
            resolutionType: getResolutionType()
        });
    });

    // The distinct key comparer is the resolutionType
    return resolutionType$.distinctUntilKeyChanged("resolutionType");
}