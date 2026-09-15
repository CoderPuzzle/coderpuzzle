impl Solution {
    pub fn min_cost(nums: Vec<i32>, cost: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut idx: Vec<usize> = (0..n).collect();
        idx.sort_by_key(|&i| nums[i]);
        // The cost sum(|nums[i]-t|*cost[i]) is convex piecewise-linear in t;
        // its slope flips where cumulative cost crosses half the total, so
        // the optimum is the weighted median.
        let total: i64 = cost.iter().map(|&c| c as i64).sum();
        let mut target = (total + 1) / 2;
        let mut median = nums[idx[n - 1]] as i64;
        // Walk sorted values, spending weights from the ceil(total/2)
        // budget; the value that exhausts it is the weighted median.
        for &i in &idx {
            target -= cost[i] as i64;
            if target <= 0 {
                median = nums[i] as i64;
                break;
            }
        }
        // Evaluate the convex cost at the median; it lies at a breakpoint
        // (an existing value), so restricting to nums values loses nothing.
        let mut ans = 0i64;
        for i in 0..n {
            ans += ((nums[i] as i64) - median).abs() * (cost[i] as i64);
        }
        ans
    }
}
