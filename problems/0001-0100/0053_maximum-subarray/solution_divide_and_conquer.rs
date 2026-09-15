impl Solution {
    // Each range answers four questions at once: total sum, best prefix,
    // best suffix, and best interior subarray. Merging two halves glues
    // them together, so one recursion describes the whole array.
    fn solve(nums: &[i32], lo: usize, hi: usize) -> (i64, i64, i64, i64) {
        // A single element is its own total, prefix, suffix, and best.
        if hi - lo == 1 {
            let x = nums[lo] as i64;
            return (x, x, x, x);
        }
        let mid = (lo + hi) / 2;
        let (lt, lp, ls, lb) = Solution::solve(nums, lo, mid);
        let (rt, rp, rs, rb) = Solution::solve(nums, mid, hi);
        // The best subarray either stays in one half or is the seam of the
        // left half's best suffix and the right half's best prefix.
        let total = lt + rt;
        let prefix = lp.max(lt + rp);
        let suffix = rs.max(rt + ls);
        let best = lb.max(rb).max(ls + rp);
        (total, prefix, suffix, best)
    }

    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        Solution::solve(&nums, 0, nums.len()).3 as i32
    }
}
