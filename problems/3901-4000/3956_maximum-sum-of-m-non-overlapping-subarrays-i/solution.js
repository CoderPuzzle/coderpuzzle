/**
 * @param {number[]} nums
 * @param {number} m
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var maximumSum = function (nums, m, l, r) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) prefix[i] = prefix[i - 1] + nums[i - 1];

    let previous = new Array(n + 1).fill(0);
    let answer = Number.NEGATIVE_INFINITY;

    for (let count = 1; count <= Math.min(m, Math.floor(n / l)); count++) {
        const current = new Array(n + 1).fill(Number.NEGATIVE_INFINITY);
        const indexes = [];
        const values = [];
        let head = 0;

        for (let end = 1; end <= n; end++) {
            const start = end - l;
            if (start >= 0 && previous[start] !== Number.NEGATIVE_INFINITY) {
                const value = previous[start] - prefix[start];
                while (values.length > head && values[values.length - 1] <= value) {
                    indexes.pop();
                    values.pop();
                }
                indexes.push(start);
                values.push(value);
            }

            const earliest = end - r;
            while (head < indexes.length && indexes[head] < earliest) head++;

            current[end] = current[end - 1];
            if (head < values.length) current[end] = Math.max(current[end], prefix[end] + values[head]);
        }
        answer = Math.max(answer, current[n]);
        previous = current;
    }
    // The largest possible magnitude is 10^12, which Number represents exactly.
    return answer;
};
