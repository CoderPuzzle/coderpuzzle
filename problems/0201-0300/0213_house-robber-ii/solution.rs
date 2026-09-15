impl Solution {
    pub fn rob(nums: Vec<i32>) -> i64 {
        // A lone house has no distinct neighbor on either side, so robbing it
        // is legal even though both "give up an end" sweeps below see nothing.
        if nums.len() == 1 {
            return nums[0] as i64;
        }
        // The circle's only extra edge over the line joins the first and last
        // houses, so every legal plan gives up the first house or the last:
        // solve the linear street on nums[1:] and nums[:-1], keep the better.
        rob_line(&nums[1..]).max(rob_line(&nums[..nums.len() - 1]))
    }
}

// Rolling two-variable DP: cur is the best through house i-1, prev the best
// through i-2, so no DP table is ever allocated.
fn rob_line(houses: &[i32]) -> i64 {
    let (mut prev, mut cur) = (0, 0);
    for &money in houses {
        let next = cur.max(prev + money as i64);
        prev = cur;
        cur = next;
    }
    cur
}
