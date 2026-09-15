impl Solution {
    pub fn min_operations(nums: Vec<i32>, x: i32) -> i32 {
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        let target = total - x as i64; // longest middle subarray summing to target
        if target < 0 {
            return -1;
        }
        if target == 0 {
            return nums.len() as i32;
        }
        let mut best: i32 = -1;
        let mut window: i64 = 0;
        let mut left = 0usize;
        for (right, &value) in nums.iter().enumerate() {
            window += value as i64;
            while window > target {
                window -= nums[left] as i64;
                left += 1;
            }
            if window == target {
                best = best.max((right - left + 1) as i32);
            }
        }
        if best == -1 {
            -1
        } else {
            nums.len() as i32 - best
        }
    }
}
