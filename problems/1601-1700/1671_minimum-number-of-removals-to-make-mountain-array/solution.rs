impl Solution {
    pub fn minimum_mountain_removals(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // lis[i]: longest strictly increasing subsequence ending at i
        // (strict comparisons — plateaus can ride neither slope);
        // lds[i]: symmetric strictly decreasing chain starting at i, built
        // by scanning right to left.
        let mut lis = vec![1usize; n];
        let mut lds = vec![1usize; n];
        for i in 0..n {
            for j in 0..i {
                if nums[j] < nums[i] && lis[j] + 1 > lis[i] {
                    lis[i] = lis[j] + 1;
                }
            }
        }
        for i in (0..n).rev() {
            for j in i + 1..n {
                if nums[j] < nums[i] && lds[j] + 1 > lds[i] {
                    lds[i] = lds[j] + 1;
                }
            }
        }
        // Minimizing removals = maximizing mountain length. A valid peak
        // needs at least one element on each side, and the peak is counted
        // by both tables, hence the -1.
        let mut best = 0usize;
        for i in 0..n {
            if lis[i] >= 2 && lds[i] >= 2 {
                best = best.max(lis[i] + lds[i] - 1);
            }
        }
        (n - best) as i32
    }
}
