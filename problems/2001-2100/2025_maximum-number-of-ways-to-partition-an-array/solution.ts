function waysToPartition(nums: number[], k: number): number {
    const total = nums.reduce((sum, value) => sum + value, 0);
    const right = new Map<number, number>();
    let prefix = 0;
    for (let pivot = 1; pivot < nums.length; ++pivot) {
        prefix += nums[pivot - 1];
        const difference = 2 * prefix - total;
        right.set(difference, (right.get(difference) || 0) + 1);
    }

    const left = new Map<number, number>();
    let answer = right.get(0) || 0;
    prefix = 0;
    for (let index = 0; index < nums.length; ++index) {
        const delta = k - nums[index];
        answer = Math.max(answer, (left.get(delta) || 0) + (right.get(-delta) || 0));

        if (index < nums.length - 1) {
            prefix += nums[index];
            const difference = 2 * prefix - total;
            right.set(difference, right.get(difference)! - 1);
            left.set(difference, (left.get(difference) || 0) + 1);
        }
    }

    return answer;
}
