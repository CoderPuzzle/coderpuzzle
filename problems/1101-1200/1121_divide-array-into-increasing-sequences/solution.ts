function canDivideIntoSubsequences(nums: number[], k: number): boolean {
    // The longest run of equal values forces that many separate sequences;
    // the array is sorted, so runs are contiguous.
    let maxfreq = 1;
    let run = 1;
    for (let i = 1; i < nums.length; ++i) {
        run = nums[i] === nums[i - 1] ? run + 1 : 1;
        if (run > maxfreq) maxfreq = run;
    }
    // The product stays far below 2^53, so double comparison is exact.
    return nums.length >= maxfreq * k;
}
