// All intermediate integers are at most about 10^15, below Number.MAX_SAFE_INTEGER.
function maximumSum(nums: number[], m: number, l: number, r: number): number {
    const n = nums.length;
    const prefix = new Array<number>(n + 1).fill(0);
    for (let i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + nums[i];

    const values = new Array<number>(n + 1).fill(0);
    const counts = new Array<number>(n + 1).fill(0);
    const queue = new Array<number>(n + 1).fill(0);
    const evaluate = (penalty: number): [number, number] => {
        let head = 0;
        let tail = 0;
        values[0] = 0;
        counts[0] = 0;
        for (let end = 1; end <= n; ++end) {
            let start = end - l;
            if (start >= 0) {
                const key = values[start] - prefix[start];
                while (tail > head) {
                    const back = queue[tail - 1];
                    const backKey = values[back] - prefix[back];
                    if (backKey > key || (backKey === key && counts[back] > counts[start])) break;
                    --tail;
                }
                queue[tail++] = start;
            }
            while (head < tail && queue[head] < end - r) ++head;

            values[end] = values[end - 1];
            counts[end] = counts[end - 1];
            if (head < tail) {
                start = queue[head];
                const takeValue = prefix[end] - penalty + values[start] - prefix[start];
                const takeCount = counts[start] + 1;
                if (takeValue > values[end] || (takeValue === values[end] && takeCount > counts[end])) {
                    values[end] = takeValue;
                    counts[end] = takeCount;
                }
            }
        }
        return [values[n], counts[n]];
    };

    let [value, count] = evaluate(0);
    if (count === 0) {
        let head = 0;
        let tail = 0;
        let best = -Infinity;
        for (let end = 1; end <= n; ++end) {
            const start = end - l;
            if (start >= 0) {
                while (tail > head && prefix[queue[tail - 1]] >= prefix[start]) --tail;
                queue[tail++] = start;
            }
            while (head < tail && queue[head] < end - r) ++head;
            if (head < tail) best = Math.max(best, prefix[end] - prefix[queue[head]]);
        }
        return best;
    }
    if (count <= m) return value;

    let maxAbs = 0;
    for (const number of nums) maxAbs = Math.max(maxAbs, Math.abs(number));
    let lowPenalty = 0;
    let highPenalty = maxAbs * n + 1;
    while (lowPenalty < highPenalty) {
        const penalty = Math.floor((lowPenalty + highPenalty + 1) / 2);
        if (evaluate(penalty)[1] >= m) lowPenalty = penalty;
        else highPenalty = penalty - 1;
    }
    [value] = evaluate(lowPenalty);
    return value + lowPenalty * m;
}
