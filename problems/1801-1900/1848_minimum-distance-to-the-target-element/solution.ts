function getMinDistance(nums: number[], target: number, start: number): number {
    // One scan: the closest occurrence of target is whichever index
    // minimizes abs(i - start).
    let best = nums.length;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            best = Math.min(best, Math.abs(i - start));
        }
    }
    return best;
}
