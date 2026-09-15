function maximizeExpressionOfThree(nums: number[]): number {
    // The best assignment inside any picked triple puts its two largest
    // values in the a and b slots and its smallest in the c slot, so the
    // optimum is the array's two largest values minus its smallest.
    let top = Math.max(nums[0], nums[1]);
    let runnerUp = Math.min(nums[0], nums[1]);
    let low = runnerUp;
    // Fold in every later element (n >= 3): below the minimum replaces it,
    // above the top pushes the old top down to runner-up, anything else
    // that beats the runner-up takes its seat.
    for (let i = 2; i < nums.length; ++i) {
        const num = nums[i];
        if (num < low) {
            low = num;
        }
        if (num > top) {
            runnerUp = top;
            top = num;
        } else if (num > runnerUp) {
            runnerUp = num;
        }
    }
    return top + runnerUp - low;
}
