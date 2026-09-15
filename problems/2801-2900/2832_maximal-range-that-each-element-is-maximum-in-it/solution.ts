function maximumLengthOfRanges(nums: number[]): number[] {
    const n = nums.length;
    const left = new Array<number>(n); // nearest index with a greater element on the left, +1
    let stack: number[] = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[i]) stack.pop();
        left[i] = stack.length ? stack[stack.length - 1] + 1 : 0;
        stack.push(i);
    }
    const right = new Array<number>(n); // nearest index with a greater element on the right, -1
    stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[i]) stack.pop();
        right[i] = stack.length ? stack[stack.length - 1] - 1 : n - 1;
        stack.push(i);
    }
    const result = new Array<number>(n);
    for (let i = 0; i < n; i++) result[i] = right[i] - left[i] + 1;
    return result;
}
