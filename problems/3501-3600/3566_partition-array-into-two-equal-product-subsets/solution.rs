impl Solution {
    pub fn check_equal_partitions(nums: Vec<i32>, target: i64) -> bool {
        // Enumerate every proper subset as one side; the mask's complement
        // is the other side. Products stop early once they exceed target,
        // so intermediates stay below target * 100 <= 1e17 — far inside
        // the i64 range.
        let n = nums.len();
        let full = (1i64 << n) - 1;
        if nums.iter().any(|&x| target % x as i64 != 0) {
            // every element sits in a side, so each divides target
            return false;
        }
        let product_within = |mask: i64| -> i64 {
            let mut product = 1_i64;
            for i in 0..n {
                if mask >> i & 1 == 1 {
                    product *= nums[i] as i64;
                    if product > target {
                        return -1;
                    }
                }
            }
            product
        };
        for mask in 1..full {
            if product_within(mask) == target && product_within(mask ^ full) == target {
                return true;
            }
        }
        false
    }
}
