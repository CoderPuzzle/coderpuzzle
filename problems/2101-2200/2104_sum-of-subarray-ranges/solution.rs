impl Solution {
    pub fn sub_array_ranges(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut total: i64 = 0;
        for i in 0..n {
            // Extending nums[i..j-1] by nums[j] updates the range in O(1):
            // only the new element can tighten mn or raise mx.
            let mut mn = nums[i];
            let mut mx = nums[i];
            // j starts at i+1, skipping length-1 subarrays (range 0).
            for j in i + 1..n {
                // else-if is safe: one element can't be both a strict new
                // minimum and a strict new maximum.
                if nums[j] < mn {
                    mn = nums[j];
                } else if nums[j] > mx {
                    mx = nums[j];
                }
                total += (mx - mn) as i64;
            }
        }
        total
    }
}
