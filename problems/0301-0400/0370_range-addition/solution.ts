function getModifiedArray(length: number, updates: number[][]): number[] {
    // Record only where the running total changes: +inc at start,
    // -inc just past end. The extra slot makes end+1 safe at the
    // last index.
    const diff: number[] = new Array(length + 1).fill(0);
    for (const [start, end, inc] of updates) {
        diff[start] += inc;
        diff[end + 1] -= inc;
    }
    // One prefix-sum sweep: position i sees exactly the updates whose
    // ranges still cover it.
    const arr: number[] = new Array(length);
    let cur = 0;
    for (let i = 0; i < length; i++) {
        cur += diff[i];
        arr[i] = cur;
    }
    return arr;
}
