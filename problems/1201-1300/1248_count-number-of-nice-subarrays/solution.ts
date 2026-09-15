function numberOfSubarrays(nums: number[], k: number): number {
    const n = nums.length;
    // counts[c] = how many earlier prefixes had odd-count c; seeding the
    // empty prefix at 0 makes subarrays starting at index 0 countable.
    const counts: number[] = new Array(n + 1).fill(0);
    counts[0] = 1;
    let odds = 0;
    let result = 0;
    for (const x of nums) {
        // Only parity matters (odd->1, even->0), so "exactly k odds"
        // becomes the classic "subarray with sum exactly k".
        odds += x & 1;
        // Every earlier prefix with odds - k pairs with the current one
        // to close one nice subarray; the guard just avoids a negative
        // index before enough odds have accumulated.
        if (odds - k >= 0) {
            result += counts[odds - k];
        }
        counts[odds] += 1;
    }
    return result;
}
