function longestNiceSubarray(nums: number[]): number {
    // a lone element is always nice: best starts at 1, mask starts empty
    let best = 1;
    let left = 0;
    let windowOr = 0;
    // nice <=> no two members share a bit <=> the window's OR mask is
    // disjoint from the incoming value: one AND test per step
    for (let right = 0; right < nums.length; right++) {
        const value = nums[right];
        // conflict: drop from the left; XOR undoes the earlier | because
        // disjointness guarantees the element's bits are private to it
        while ((windowOr & value) !== 0) {
            windowOr ^= nums[left];
            left++;
        }
        windowOr |= value;
        if (right - left + 1 > best) {
            best = right - left + 1;
        }
    }
    return best;
}
