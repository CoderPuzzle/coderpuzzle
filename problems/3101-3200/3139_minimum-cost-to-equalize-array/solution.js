/**
 * @param {number[]} nums
 * @param {number} cost1
 * @param {number} cost2
 * @return {number}
 */
var minCostToEqualizeArray = function (nums, cost1, cost2) {
    // Costs reach about 10^17 (trillions of pair ops times prices up to
    // 10^6), far past Number's safe range, so the running costs live on
    // bigint; only the reduced answer converts back. Each candidate target
    // admits at most min(total/2, total - peak) pair ops, worth taking
    // while cost2 < 2 * cost1, and scanning targets to twice the maximum
    // is enough: further steps strictly raise the cost.
    const MOD = 1000000007n;
    let low = nums[0];
    let high = nums[0];
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i] < low) low = nums[i];
        if (nums[i] > high) high = nums[i];
    }
    const price1 = BigInt(cost1);
    const price2 = BigInt(cost2);
    const count = BigInt(nums.length);
    let total = 0n;
    for (const v of nums) {
        total += BigInt(high - v);
    }
    if (2n * price1 <= price2) {
        return Number((total * price1) % MOD);
    }
    let best = null;
    for (let target = high; target <= 2 * high; ++target) {
        const peak = BigInt(target - low);
        let pair;
        let rest;
        if (2n * peak <= total) {
            pair = total / 2n;
            rest = total % 2n;
        } else {
            pair = total - peak;
            rest = 2n * peak - total;
        }
        const cost = pair * price2 + rest * price1;
        if (best === null || cost < best) {
            best = cost;
        }
        total += count;
    }
    return Number(best % MOD);
};
