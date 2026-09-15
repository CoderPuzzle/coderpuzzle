impl Solution {
    pub fn get_maximum_generated(n: i32) -> i32 {
        if n == 0 {
            return 0;
        }
        let n = n as usize;
        let mut nums = vec![0i32; n + 1];
        nums[1] = 1;
        let mut best = 1;
        for i in 2..=n {
            if i % 2 == 0 {
                nums[i] = nums[i / 2];
            } else {
                nums[i] = nums[i / 2] + nums[i / 2 + 1];
            }
            best = best.max(nums[i]);
        }
        best
    }
}
