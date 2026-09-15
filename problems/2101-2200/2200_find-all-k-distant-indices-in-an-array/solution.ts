function findKDistantIndices(nums: number[], key: number, k: number): number[] {
    const out: number[] = [];
    let nextFree = 0;
    // each key occurrence contributes the window [j-k, j+k]; windows
    // are naturally ordered, so clip against what's already emitted
    // instead of deduplicating through a set
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== key) {
            continue;
        }
        const lo = Math.max(nextFree, j - k);
        const hi = Math.min(nums.length - 1, j + k);
        for (let i = lo; i <= hi; i++) {
            out.push(i);
        }
        nextFree = hi + 1;
    }
    return out;
}
