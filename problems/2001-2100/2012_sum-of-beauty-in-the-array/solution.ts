function sumOfBeauties(nums: number[]): number {
    const n = nums.length;
    const prefix = new Array<number>(n).fill(0);
    const suffix = new Array<number>(n).fill(0);
    for (let index = 1; index < n; ++index) {
        prefix[index] = Math.max(prefix[index - 1], nums[index - 1]);
    }
    suffix[n - 2] = nums[n - 1];
    for (let index = n - 3; index >= 1; --index) {
        suffix[index] = Math.min(suffix[index + 1], nums[index + 1]);
    }

    let beauty = 0;
    for (let index = 1; index < n - 1; ++index) {
        if (prefix[index] < nums[index] && nums[index] < suffix[index]) {
            beauty += 2;
        } else if (nums[index - 1] < nums[index] && nums[index] < nums[index + 1]) {
            ++beauty;
        }
    }
    return beauty;
}
