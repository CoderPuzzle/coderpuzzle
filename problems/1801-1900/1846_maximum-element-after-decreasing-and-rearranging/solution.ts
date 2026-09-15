function maximumElementAfterDecrementingAndRearranging(arr: number[]): number {
    // After sorting, each element can be raised to at most one more than
    // the previous; the answer is the running value min(prev + 1, v).
    arr.sort((a, b) => a - b);
    let cur = 1;
    for (let i = 1; i < arr.length; i++) {
        cur = Math.min(cur + 1, arr[i]);
    }
    return cur;
}
