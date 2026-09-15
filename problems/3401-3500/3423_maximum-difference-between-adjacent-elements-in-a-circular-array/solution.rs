impl Solution {
    pub fn max_adjacent_distance(nums: Vec<i32>) -> i32 {
        // One pass over the n circular edges: pair i with (i + 1) % n, so
        // the last iteration compares the last and first elements.
        let n = nums.len();
        let mut ans = 0;
        for i in 0..n {
            let d = (nums[i] - nums[(i + 1) % n]).abs();
            ans = ans.max(d);
        }
        ans
    }
}
