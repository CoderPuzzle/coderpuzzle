function numOfSubarrays(arr: number[], k: number, threshold: number): number {
    // window_sum >= k * threshold is the exact integer form of
    // "average >= threshold"; the window updates in O(1) per slide.
    const need = k * threshold;
    let window = 0;
    for (let i = 0; i < k; ++i) window += arr[i];
    let count = window >= need ? 1 : 0;
    for (let i = k; i < arr.length; ++i) {
        window += arr[i] - arr[i - k];
        if (window >= need) ++count;
    }
    return count;
}
