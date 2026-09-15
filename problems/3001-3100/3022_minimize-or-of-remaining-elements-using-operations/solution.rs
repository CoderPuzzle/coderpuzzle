impl Solution {
    pub fn min_or_after_operations(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let mut total = 0;
        for &value in &nums {
            total |= value;
        }

        fn groups_for(nums: &[i32], forbidden: i32) -> i32 {
            let mut groups = 0i32;
            let mut running = -1i32;
            for &value in nums {
                running &= value;
                if running & forbidden == 0 {
                    groups += 1;
                    running = -1;
                }
            }
            if running != -1 && groups == 0 {
                -1
            } else {
                groups
            }
        }

        let mut forbidden = 0;
        for bit in (0..30).rev() {
            let candidate = forbidden | (1 << bit);
            let groups = groups_for(&nums, candidate);
            if groups != -1 && (n as i32 - groups) <= k {
                forbidden = candidate;
            }
        }
        total & !forbidden
    }
}
