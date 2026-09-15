function maxFixedPoints(nums: number[]): number {
    const candidates: number[][] = [];
    for (let i = 0; i < nums.length; i += 1) {
        if (nums[i] <= i) candidates.push([nums[i], i - nums[i]]);
    }
    candidates.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const bit = new Array<number>(nums.length + 1).fill(0);
    const query = (original: number): number => {
        let index = original + 1;
        let best = 0;
        while (index > 0) {
            best = Math.max(best, bit[index]);
            index -= index & -index;
        }
        return best;
    };
    const update = (original: number, value: number): void => {
        let index = original + 1;
        while (index < bit.length) {
            bit[index] = Math.max(bit[index], value);
            index += index & -index;
        }
    };

    let answer = 0;
    for (let start = 0; start < candidates.length;) {
        let end = start;
        const pending: number[][] = [];
        while (end < candidates.length && candidates[end][0] === candidates[start][0]) {
            const deletionCount = candidates[end][1];
            const length = query(deletionCount) + 1;
            pending.push([deletionCount, length]);
            answer = Math.max(answer, length);
            end += 1;
        }
        for (const [deletionCount, length] of pending) update(deletionCount, length);
        start = end;
    }
    return answer;
}
