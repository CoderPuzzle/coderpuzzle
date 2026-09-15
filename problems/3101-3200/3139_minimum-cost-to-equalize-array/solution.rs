impl Solution {
    pub fn min_cost_to_equalize_array(nums: Vec<i32>, cost1: i32, cost2: i32) -> i32 {
        // Costs reach about 10^17 -- deficits up to 2*10^11 times prices up
        // to 10^6 -- so every running figure stays in i64 and only the
        // reduced answer narrows back. Each candidate target admits at most
        // min(total/2, total - peak) pair ops, worth taking while cost2 <
        // 2 * cost1; scanning targets up to twice the maximum suffices
        // because further steps only add cost.
        const MOD: i64 = 1_000_000_007;
        let mut low = nums[0];
        let mut high = nums[0];
        for &v in &nums {
            if v < low {
                low = v;
            }
            if v > high {
                high = v;
            }
        }
        let price1 = cost1 as i64;
        let price2 = cost2 as i64;
        let mut total: i64 = 0;
        for &v in &nums {
            total += (high - v) as i64;
        }
        if 2 * price1 <= price2 {
            return (total * price1 % MOD) as i32;
        }
        let count = nums.len() as i64;
        let mut best = i64::MAX;
        for target in (high as i64)..=(2 * (high as i64)) {
            let peak = target - (low as i64);
            let pair;
            let rest;
            if 2 * peak <= total {
                pair = total / 2;
                rest = total % 2;
            } else {
                pair = total - peak;
                rest = 2 * peak - total;
            }
            let cost = pair * price2 + rest * price1;
            if cost < best {
                best = cost;
            }
            total += count;
        }
        (best % MOD) as i32
    }
}
