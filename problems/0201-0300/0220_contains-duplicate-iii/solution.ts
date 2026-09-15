function containsNearbyAlmostDuplicate(nums: number[], indexDiff: number, valueDiff: number): boolean {
    // Value buckets of width valueDiff + 1, keyed by floor division: two
    // values in one bucket are within valueDiff by construction, so each
    // bucket holds at most one live value and a same-bucket hit is a "yes".
    const width = valueDiff + 1;
    const buckets = new Map<number, number>();
    for (let index = 0; index < nums.length; ++index) {
        if (index > indexDiff) {
            // The window spans only the previous indexDiff positions;
            // retire the bucket of the value that just fell out of it.
            buckets.delete(Math.floor(nums[index - indexDiff - 1] / width));
        }
        const value = nums[index];
        const bucket = Math.floor(value / width);
        if (buckets.has(bucket)) return true;
        // Neighbor buckets can hold values up to 2*valueDiff away, so their
        // occupants need a real distance comparison.
        const below = buckets.get(bucket - 1);
        if (below !== undefined && value - below <= valueDiff) return true;
        const above = buckets.get(bucket + 1);
        if (above !== undefined && above - value <= valueDiff) return true;
        buckets.set(bucket, value);
    }
    return false;
}
