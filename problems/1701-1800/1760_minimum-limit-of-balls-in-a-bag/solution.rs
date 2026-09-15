impl Solution {
    pub fn minimum_size(nums: Vec<i32>, max_operations: i32) -> i32 {
        // A bag of v must end as ceil(v/penalty) pieces; each division
        // creates exactly one new bag, so it costs ceil(v/penalty) - 1 =
        // (v - 1) / penalty operations — achievable with near-equal splits,
        // all of size <= penalty.
        let needed = |penalty: i32| -> i64 {
            let mut total = 0i64;
            for &balls in &nums {
                total += ((balls - 1) / penalty) as i64;
            }
            total
        };

        // Achievability is monotone in the penalty, so binary search the
        // smallest feasible value; max(nums) needs zero operations.
        let mut lo = 1i32;
        let mut hi = *nums.iter().max().unwrap();
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if needed(mid) <= max_operations as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
