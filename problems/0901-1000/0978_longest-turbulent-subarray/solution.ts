function maxTurbulenceSize(arr: number[]): number {
    // Single sweep with a running sign state: a comparison that flips
    // the previous sign extends the turbulent run, a repeat or an
    // equal pair restarts it at the appropriate short length.
    let best = 1;
    let run = 1;
    let prevSign = 0; // sign of the previous comparison: -1, 0, or 1
    for (let i = 1; i < arr.length; ++i) {
        let sign = 0;
        if (arr[i] > arr[i - 1]) {
            sign = 1;
        } else if (arr[i] < arr[i - 1]) {
            sign = -1;
        }
        if (sign === 0) {
            run = 1;
        } else if (sign === -prevSign) {
            ++run;
        } else {
            run = 2;
        }
        prevSign = sign;
        // A run only reaches its full length at its last element, so
        // tracking the best while it grows misses nothing.
        best = Math.max(best, run);
    }
    return best;
}
