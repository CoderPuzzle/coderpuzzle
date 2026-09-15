/**
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var countRatioSubarrays = function (nums, a, b) {
    const n = nums.length;
    // Transformed prefix sums reach 10^5 * 10^9 = 10^14 and the answer
    // reaches ~5 * 10^9 — both within Number's exact integer range (2^53).
    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + (nums[i] % 2 === 0 ? b : -a);
    }
    // Coordinate-compress the prefix values; duplicates share one slot
    // so that >= comparisons count them all.
    const sorted = [...pref].sort((x, y) => x - y);
    let size = 0;
    for (let i = 0; i < sorted.length; i++) {
        if (i === 0 || sorted[i] !== sorted[size - 1]) sorted[size++] = sorted[i];
    }
    const tree = new Array(size + 1).fill(0);
    const rank = (value) => {
        let lo = 0,
            hi = size - 1;
        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            if (sorted[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo + 1;
    };
    let answer = 0;
    update(rank(pref[0]));
    let seen = 1;
    for (let m = 1; m <= n; m++) {
        const r = rank(pref[m]);
        // Subarray [m-1, k] for every earlier l = k with
        // pref[m] <= pref[l]: everything seen minus what is strictly below.
        answer += seen - query(r - 1);
        update(r);
        seen++;
    }
    return answer;

    function update(i) {
        for (; i <= size; i += i & -i) tree[i]++;
    }

    function query(i) {
        let total = 0;
        for (; i > 0; i -= i & -i) total += tree[i];
        return total;
    }
};
