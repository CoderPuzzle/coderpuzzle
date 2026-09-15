impl Solution {
    pub fn min_changes(nums: Vec<i32>, k: i32) -> i32 {
        // Every symmetric pair (nums[i], nums[n-1-i]) must end up exactly d
        // apart for one shared difference d, so the answer is the cheapest
        // per-pair total over all k + 1 candidates. Sorted as lo <= hi, a
        // pair whose difference already equals d costs 0; otherwise one
        // replacement fixes it exactly when the moved value stays inside
        // [0, k], which is equivalent to d <= hi or d <= k - lo; failing
        // that, the pair costs 2. Bucket exact matches and add a +1 range
        // mark for each one-change reach, then sweep d once: cost(d) =
        // n - reachable(d) - exact(d). Totals stay below n, so i32 suffices.
        let n = nums.len();
        let half = n / 2;
        let ku = k as usize;
        let mut exact = vec![0i32; ku + 1];
        let mut delta = vec![i32::default(); ku + 2];
        for i in 0..half {
            let mut a = nums[i];
            let mut b = nums[n - 1 - i];
            if a > b {
                core::mem::swap(&mut a, &mut b);
            }
            exact[(b - a) as usize] += 1;
            let reach = b.max(k - a);
            delta[0] += 1;
            delta[(reach + 1) as usize] -= 1;
        }
        let mut best = 2 * half as i32;
        let mut reachable = 0;
        for d in 0..=ku {
            reachable += delta[d];
            best = best.min(2 * half as i32 - reachable - exact[d]);
        }
        best
    }
}
