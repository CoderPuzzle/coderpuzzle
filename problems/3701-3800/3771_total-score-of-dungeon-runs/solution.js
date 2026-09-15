/**
 * @param {number} hp
 * @param {number[]} damage
 * @param {number[]} requirement
 * @return {number}
 */
var totalScore = function (hp, damage, requirement) {
    // pref[i] = total damage of rooms 1..i (pref[0] = 0). Starting at room
    // a+1, room b (b >= a+1) pays a point iff hp - (pref[b] - pref[a]) >=
    // requirement[b], i.e. pref[a] >= requirement[b] - hp + pref[b]. Over
    // all n(n+1)/2 subarrays this is a dominance count, done per b with a
    // Fenwick tree over compressed prefix sums holding pref[0..b-1]; failing
    // pairs (pref[a] < threshold) are subtracted from the total. Every
    // number stays far below 2^53: pref <= 1e9 and the answer n(n+1)/2 ~ 5e9
    // for n <= 1e5, so plain number arithmetic is exact throughout.
    const n = damage.length;
    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + damage[i];
    }
    const values = Array.from(new Set(pref)).sort((a, b) => a - b);
    const m = values.length;
    const lower = (x) => {
        let lo = 0;
        let hi = m;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (values[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    const bit = new Array(m + 1).fill(0);
    const add = (pos) => {
        for (let i = pos + 1; i <= m; i += i & -i) {
            bit[i] += 1;
        }
    };
    const prefix = (pos) => {
        let total = 0;
        for (let i = pos; i > 0; i -= i & -i) {
            total += bit[i];
        }
        return total;
    };
    add(lower(pref[0]));
    let failing = 0;
    for (let b = 1; b <= n; b++) {
        const threshold = requirement[b - 1] - hp + pref[b];
        // Number of inserted pref[a] with pref[a] < threshold.
        failing += prefix(lower(threshold));
        add(lower(pref[b]));
    }
    return (n * (n + 1)) / 2 - failing;
};
