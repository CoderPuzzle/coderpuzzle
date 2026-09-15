function minMoves2(nums: number[]): number {
    // Each move shifts one element by one unit, so gathering everything on
    // a target t costs exactly sum |x - t| — and a sum of absolute distances
    // is minimized at the median. Pairing the sorted values outermost-inward
    // shows why: a pair pays its full gap wherever its two elements meet, so
    // any pivot between the two middles is optimal, and the lower middle
    // element is as good as any.
    nums.sort((a, b) => a - b);
    const pivot = nums[(nums.length - 1) >> 1];
    // The total spans n * 2*10^9, up to 2*10^14, which doubles still hold
    // exactly inside their 53-bit integer range.
    let total = 0;
    for (const value of nums) {
        total += Math.abs(value - pivot);
    }
    return total;
}
