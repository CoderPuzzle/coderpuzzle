impl Solution {
    pub fn find_prefix_score(nums: Vec<i32>) -> Vec<i64> {
        // ans is the prefix sum of the conversion array, so one fused pass
        // keeps a running max and a running total, never storing conver
        // itself. Conversion values reach 2*10^9 and totals 2*10^14, both
        // past i32 range, so everything accumulates in i64.
        let mut result = Vec::with_capacity(nums.len());
        let mut running_max: i64 = 0;
        let mut total: i64 = 0;
        for &value in &nums {
            let value = value as i64;
            if value > running_max {
                running_max = value;
            }
            total += value + running_max;
            result.push(total);
        }
        result
    }
}
