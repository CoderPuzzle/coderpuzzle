function minMirrorPairDistance(nums: number[]): number {
    let best = -1;
    // Most recent index for each reversed value; a nearer supplier beats a
    // farther one for every future match, so older entries never matter
    // again.
    const latest = new Map<number, number>();
    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        // Look up before recording: an index cannot pair with itself, so
        // palindromic values wait here for a genuine second occurrence.
        const mirror = latest.get(num);
        if (mirror !== undefined && (best === -1 || index - mirror < best)) {
            best = index - mirror;
        }
        // Reversal peels last digits off until none remain; trailing zeros
        // drop out on their own (120 -> 21, 100 -> 1).
        let reversedValue = 0;
        let value = num;
        while (value > 0) {
            reversedValue = reversedValue * 10 + (value % 10);
            value = Math.floor(value / 10);
        }
        latest.set(reversedValue, index);
    }
    return best;
}
