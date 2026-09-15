// With values capped at 100, a value is either present in a range or not,
// and 100 prefix-count rows decide that in O(1): row v holds the
// occurrence count of v over every prefix of nums, so v appears in
// nums[l..r] exactly when its count rises between l and r+1. A query then
// walks the value axis 1..100, collects the values whose counts rise, and
// takes the smallest gap between consecutive ones — present values arrive
// in increasing order, and the minimum |a[i] - a[j]| over a set always
// sits between value-adjacent elements. Fewer than two rising rows means
// every element in the range matches, so the answer is -1; with two or
// more the gap is at most 99, which is what makes the untouched sentinel
// honest. A flat Int32Array keeps the 100 x (n+1) table at ~40 MB; counts
// fit 32-bit and every arithmetic stays far below 2^53.
function minDifference(nums: number[], queries: number[][]): number[] {
    const n = nums.length;
    // pre[v * (n + 1) + i] = occurrences of value v in nums[0..i)
    const pre = new Int32Array(101 * (n + 1));
    for (let v = 1; v <= 100; v++) {
        const base = v * (n + 1);
        let run = 0;
        for (let i = 0; i < n; i++) {
            if (nums[i] === v) run++;
            pre[base + i + 1] = run;
        }
    }
    const answer: number[] = new Array(queries.length);
    for (let q = 0; q < queries.length; q++) {
        const l = queries[q][0];
        const r1 = queries[q][1] + 1;
        let prev = -1;
        let best = 100;
        for (let v = 1; v <= 100; v++) {
            const base = v * (n + 1);
            if (pre[base + r1] !== pre[base + l]) {
                if (prev >= 0 && v - prev < best) best = v - prev;
                prev = v;
            }
        }
        answer[q] = best < 100 ? best : -1;
    }
    return answer;
}
