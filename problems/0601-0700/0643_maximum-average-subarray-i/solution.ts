function findMaxAverage(nums: number[], k: number): number {
    // Every window has length k, so the best average is the best window
    // sum divided by k once at the end: keep the sum in an exact integer
    // and let the single division decide precision.
    let window = 0;
    for (let index = 0; index < k; ++index) {
        window += nums[index];
    }
    let best = window;
    for (let index = k; index < nums.length; ++index) {
        window += nums[index] - nums[index - k];
        if (window > best) {
            best = window;
        }
    }
    return best / k;
}
