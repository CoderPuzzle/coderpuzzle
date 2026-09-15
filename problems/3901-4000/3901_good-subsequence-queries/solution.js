/**
 * @param {number[]} nums
 * @param {number} p
 * @param {number[][]} queries
 * @return {number}
 */
var countGoodSubseq = function (nums, p, queries) {
    const limit = 50000;
    const n = nums.length;
    const smallest = Array.from({ length: limit + 1 }, (_, i) => i);
    for (let value = 2; value * value <= limit; value += 1) {
        if (smallest[value] === value) {
            for (let multiple = value * value; multiple <= limit; multiple += value) {
                if (smallest[multiple] === multiple) smallest[multiple] = value;
            }
        }
    }
    const factors = (original) => {
        const result = [];
        let value = original;
        while (value > 1) {
            const prime = smallest[value];
            result.push(prime);
            while (value % prime === 0) value /= prime;
        }
        return result;
    };

    const counts = new Int32Array(limit + 1);
    const coveredXor = new Int32Array(limit + 1);
    const histogram = new Int32Array(n + 1);
    const forbidden = new Int32Array(n);
    let allXor = 0;
    let forbiddenDistinct = 0;
    let active = 0;
    for (let i = 0; i < n; i += 1) allXor ^= i;
    const adjust = (prime, index, delta) => {
        let count = counts[prime];
        if (count === n - 1) {
            const missing = allXor ^ coveredXor[prime];
            forbidden[missing] -= 1;
            if (forbidden[missing] === 0) forbiddenDistinct -= 1;
        }
        if (count > 0) histogram[count] -= 1;
        counts[prime] += delta;
        coveredXor[prime] ^= index;
        count = counts[prime];
        if (count > 0) histogram[count] += 1;
        if (count === n - 1) {
            const missing = allXor ^ coveredXor[prime];
            if (forbidden[missing] === 0) forbiddenDistinct += 1;
            forbidden[missing] += 1;
        }
    };
    for (let i = 0; i < n; i += 1) {
        if (nums[i] % p === 0) {
            active += 1;
            for (const prime of factors(nums[i] / p)) adjust(prime, i, 1);
        }
    }
    let answer = 0;
    for (const [index, value] of queries) {
        if (nums[index] % p === 0) {
            for (const prime of factors(nums[index] / p)) adjust(prime, index, -1);
            active -= 1;
        }
        nums[index] = value;
        if (value % p === 0) {
            active += 1;
            for (const prime of factors(value / p)) adjust(prime, index, 1);
        }
        if (
            active > 0 &&
            ((active < n && histogram[active] === 0) || (active === n && histogram[n] === 0 && forbiddenDistinct < n))
        ) {
            answer += 1;
        }
    }
    return answer;
};
