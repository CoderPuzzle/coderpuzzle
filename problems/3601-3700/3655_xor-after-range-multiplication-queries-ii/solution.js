/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function (nums, queries) {
    const MOD = 1000000007;
    // Exact residue product: splitting one factor around 2^15 keeps every
    // intermediate below 2^53, where doubles stay exact.
    const mulmod = (a, b) => {
        const hi = Math.floor(a / 32768);
        return (((hi * b) % MOD) * 32768 + (a - hi * 32768) * b) % MOD;
    };
    const power = (base) => {
        let result = 1;
        for (let exp = MOD - 2; exp > 0; exp >>>= 1) {
            if (exp & 1) {
                result = mulmod(result, base);
            }
            base = mulmod(base, base);
        }
        return result;
    };
    const n = nums.length;
    let b = 1;
    while ((b + 1) * (b + 1) <= n) {
        b++;
    }
    // Strides above the threshold visit fewer than sqrt(n) + 1 positions
    // each and are applied literally; strides at or below it share
    // residue-class buckets, each applied in one prefix-product sweep.
    const buckets = new Map();
    for (const [l, r, k, v] of queries) {
        if (k > b) {
            for (let idx = l; idx <= r; idx += k) {
                nums[idx] = (nums[idx] * v) % MOD;
            }
        } else {
            const c = l % k;
            const key = k * (b + 1) + c;
            let events = buckets.get(key);
            if (!events) {
                events = [];
                buckets.set(key, events);
            }
            // Coordinate events: the multiplier starts at l's coordinate and
            // stops just past the last visited coordinate.
            events.push([(l - c) / k, v]);
            events.push([Math.floor((r - c) / k) + 1, power(v)]);
        }
    }
    for (const [key, events] of buckets) {
        const k = Math.floor(key / (b + 1));
        const c = key % (b + 1);
        events.sort((x, y) => x[0] - y[0]);
        const span = Math.floor((n - 1 - c) / k) + 1;
        let acc = 1;
        let prev = 0;
        let i = 0;
        while (i < events.length) {
            const pos = events[i][0];
            if (acc !== 1) {
                for (let p = prev; p < pos; p++) {
                    nums[c + p * k] = mulmod(nums[c + p * k], acc);
                }
            }
            let d = 1;
            while (i < events.length && events[i][0] === pos) {
                d = mulmod(d, events[i][1]);
                i++;
            }
            acc = mulmod(acc, d);
            prev = pos;
        }
        if (acc !== 1) {
            for (let p = prev; p < span; p++) {
                nums[c + p * k] = mulmod(nums[c + p * k], acc);
            }
        }
    }
    let x = 0;
    for (const value of nums) {
        x ^= value;
    }
    return x;
};
