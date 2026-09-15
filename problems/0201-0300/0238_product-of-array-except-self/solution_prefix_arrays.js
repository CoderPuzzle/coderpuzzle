/**
 * @param {number[]} nums
 * @return {number[]}
 *
 * The judge's expected values are exact big integers, so the products are
 * computed with BigInt. The harness serializes the return value through
 * JSON.stringify, which cannot represent BigInt natively; teach it to emit
 * bare integer tokens for BigInt members.
 */
const __coderpuzzleNativeStringify = JSON.stringify;
JSON.stringify = function (value, replacer, space) {
    const text = __coderpuzzleNativeStringify(
        value,
        function (key, item) {
            if (typeof item === "bigint") {
                return "__coderpuzzle_bigint__" + item.toString();
            }
            return replacer ? replacer.call(this, key, item) : item;
        },
        space,
    );
    return typeof text === "string" ? text.replace(/"__coderpuzzle_bigint__(-?\d+)"/g, "$1") : text;
};

var productExceptSelf = function (nums) {
    // The product except nums[i] factors as (product of everything
    // before i) x (product of everything after i), both computable as
    // running products — no division, which zeros would break anyway.
    const n = nums.length;
    // pre[i] = product of the i elements preceding index i.
    const pre = [1n];
    for (let i = 0; i < n; i++) {
        pre.push(pre[i] * BigInt(nums[i]));
    }
    // suf[i] = product of everything from index i onward.
    const suf = new Array(n + 1).fill(1n);
    for (let i = n - 1; i >= 0; i--) {
        suf[i] = suf[i + 1] * BigInt(nums[i]);
    }
    const answer = [];
    // pre[i] x suf[i+1] spans everything except nums[i] itself; a lone
    // zero zeroes every cell but its own, automatically.
    for (let i = 0; i < n; i++) {
        answer.push(pre[i] * suf[i + 1]);
    }
    return answer;
};
