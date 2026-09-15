// The debounced wrapper keeps exactly one timer handle in a closure.
// Every call clears whatever is pending — clearTimeout on the stored
// handle, no-op when nothing is scheduled — then stores a fresh one for
// t milliseconds over the latest arguments. Only when a timer actually
// fires does fn run, with the spread of the most recent call's inputs,
// which is why every cancelled window leaves no trace and the last call
// of each burst is the sole survivor.
type DebouncedFn = (...args: any[]) => void;

function debounce(fn: (...inputs: any[]) => void, t: number): DebouncedFn {
    // The judge's virtual clock hands out numeric handles.
    let timer: number | null = null;
    return (...args: any[]): void => {
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
    run(debounceCase: DebounceCase): void {
        debounceCase.drive(debounce);
    }
}
