function minimumPairRemoval(nums: number[]): number {
    // The operation is forced: merge the minimum-sum adjacent pair,
    // leftmost on ties, until the array is non-decreasing. Just simulate
    // -- with n <= 50 a full rescan per step is trivial.
    const arr = [...nums];
    let ops = 0;
    const isSorted = () => {
        for (let i = 1; i < arr.length; ++i) {
            if (arr[i - 1] > arr[i]) return false;
        }
        return true;
    };
    while (!isSorted()) {
        let best = 0;
        for (let i = 1; i + 1 < arr.length; ++i) {
            if (arr[i] + arr[i + 1] < arr[best] + arr[best + 1]) {
                best = i;
            }
        }
        // strict < keeps the earliest of equal-sum pairs
        arr.splice(best, 2, arr[best] + arr[best + 1]);
        ++ops;
    }
    return ops;
}
