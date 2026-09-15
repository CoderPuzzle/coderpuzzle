// The debounced wrapper keeps exactly one timer handle in a closure.
// Every call clears whatever is pending — clearTimeout on the stored
// handle, no-op when nothing is scheduled — then stores a fresh one for
// t milliseconds over the latest arguments. Only when a timer actually
// fires does fn run, with the spread of the most recent call's inputs,
// which is why every cancelled window leaves no trace and the last call
// of each burst is the sole survivor.
function debounce(fn, t) {
    let timer = null;
    return function (...args) {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn(...args);
        }, t);
    };
}

class Solution {
    run(debounceCase) {
        debounceCase.drive(debounce);
    }
}
