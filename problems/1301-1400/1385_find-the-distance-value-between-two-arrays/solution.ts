function findTheDistanceValue(arr1: number[], arr2: number[], d: number): number {
    const sorted2 = [...arr2].sort((a, b) => a - b);
    let count = 0;
    for (const value of arr1) {
        let lo = 0;
        let hi = sorted2.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (sorted2[mid] < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        let close = false;
        if (lo < sorted2.length && sorted2[lo] - value <= d) close = true;
        if (lo > 0 && value - sorted2[lo - 1] <= d) close = true;
        if (!close) count++;
    }
    return count;
}
