impl Solution {
    // After t operations index i has absorbed t*y of decrement plus an
    // extra (x - y) every time it was picked, so candidate t is feasible
    // iff the required picks fit inside the t operations. The running
    // pick total can pass i32 range before the early exit fires, so
    // products and the accumulator stay in i64.
    fn feasible(nums: &[i32], t: i64, x: i64, y: i64) -> bool {
        let base = t * y;
        let gain = x - y;
        let mut used: i64 = 0;
        for &value in nums {
            if value as i64 > base {
                used += (value as i64 - base + gain - 1) / gain;
                if used > t {
                    return false;
                }
            }
        }
        true
    }

    pub fn min_operations(nums: Vec<i32>, x: i32, y: i32) -> i32 {
        let mut max_value = 0i32;
        for &value in nums.iter() {
            max_value = max_value.max(value);
        }
        let mut low: i64 = 1;
        let mut high = (max_value as i64 + y as i64 - 1) / y as i64; // ceil(max_value / y)
        while low < high {
            let mid = low + (high - low) / 2;
            if Self::feasible(&nums, mid, x as i64, y as i64) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        low as i32
    }
}
