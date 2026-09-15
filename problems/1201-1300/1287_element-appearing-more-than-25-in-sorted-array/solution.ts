function lowerBound(arr: number[], value: number): number {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid] < value) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}

function upperBound(arr: number[], value: number): number {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid] <= value) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}

function findSpecialInteger(arr: number[]): number {
    // A value covering more than a quarter of the array must span at least
    // one of the positions n/4, n/2, 3n/4 (a run longer than n/4 cannot
    // fit between two consecutive quarter marks). Each candidate is
    // verified by binary-searching its first and last occurrence.
    const n = arr.length;
    for (const probe of [Math.floor(n / 4), Math.floor(n / 2), Math.floor((3 * n) / 4)]) {
        const candidate = arr[probe];
        const lo = lowerBound(arr, candidate);
        const hi = upperBound(arr, candidate);
        if (hi - lo > Math.floor(n / 4)) {
            return candidate;
        }
    }
    return arr[n - 1];
}
