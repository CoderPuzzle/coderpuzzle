function maxAscendingSum(nums: number[]): number {
    // One sweep: cur is the sum of the strictly increasing run
    // ending here; extend it while the values strictly rise,
    // restart at the bare element otherwise (equal neighbours
    // break the run). Every value is positive, so the fullest
    // run ending at each index is its best subarray. Sums stay
    // <= 5050, far below 2^53, so double arithmetic is exact
    // here.
    let best = nums[0],
        cur = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = nums[i] > nums[i - 1] ? cur + nums[i] : nums[i];
        best = Math.max(best, cur);
    }
    return best;
}
