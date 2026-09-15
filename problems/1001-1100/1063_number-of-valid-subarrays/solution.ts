function validSubarrays(nums: number[]): number {
    const n = nums.length;
    let total = 0;
    const stack: number[] = [];
    for (let i = 0; i <= n; i++) {
        const current = i === n ? -1 : nums[i];
        while (stack.length > 0 && nums[stack[stack.length - 1]] > current) {
            const j = stack.pop()!;
            total += i - j;
        }
        stack.push(i);
    }
    return total;
}
