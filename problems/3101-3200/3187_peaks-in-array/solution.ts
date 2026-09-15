function countOfPeaks(nums: number[], queries: number[][]): number[] {
    const n = nums.length;

    const isPeak = (i: number): boolean => i > 0 && i < n - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1];

    // Fenwick tree over 1-indexed positions; API is 0-indexed.
    const bit: number[] = new Array(n + 1).fill(0);
    const add = (i: number, delta: number): void => {
        i += 1;
        while (i <= n) {
            bit[i] += delta;
            i += i & -i;
        }
    };
    const prefix = (i: number): number => {
        i += 1;
        let total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    };
    const rangeSum = (l: number, r: number): number => (l > r ? 0 : prefix(r) - prefix(l - 1));

    for (let i = 0; i < n; i++) {
        if (isPeak(i)) add(i, 1);
    }

    const answer: number[] = [];
    for (const q of queries) {
        if (q[0] === 1) {
            const l = q[1],
                r = q[2];
            answer.push(r - l < 2 ? 0 : rangeSum(l + 1, r - 1));
        } else {
            const idx = q[1],
                val = q[2];
            const affected = [idx - 1, idx, idx + 1].filter((j) => j >= 0 && j < n);
            for (const j of affected) {
                if (isPeak(j)) add(j, -1);
            }
            nums[idx] = val;
            for (const j of affected) {
                if (isPeak(j)) add(j, 1);
            }
        }
    }
    return answer;
}
