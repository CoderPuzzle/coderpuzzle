function search(nums: number[], target: number): number {
    // Invariant: if the target exists, its index stays inside nums[lo..hi].
    let lo = 0;
    let hi = nums.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] === target) {
            return mid;
        }
        // Each update also discards mid itself, so the interval at least
        // halves and the loop always terminates.
        if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    // Bounds crossed: the candidate interval is empty, target absent.
    return -1;
}
