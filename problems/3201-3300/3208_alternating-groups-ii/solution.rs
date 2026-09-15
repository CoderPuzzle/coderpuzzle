// A size-k group anchored at start s spans the circle's tiles s .. s + k - 1
// and alternates exactly when its k - 1 neighbor pairs all differ. Sweep
// virtual positions 0 .. n + k - 2 (virtual index p reads tile p % n, so
// pairs continue seamlessly across the seam), tracking the alternating run
// ending there; each position credits anchor p - (k - 1) when it is a real
// start (0..n-1) and the run has reached k. Anchors are bounded to one lap,
// so nothing double counts.
impl Solution {
    pub fn number_of_alternating_groups(colors: Vec<i32>, k: i32) -> i32 {
        let n = colors.len();
        let k = k as usize;
        let mut count = 0i32;
        let mut run = 0usize;
        for p in 0..n + k - 1 {
            if p > 0 && colors[p % n] != colors[(p - 1) % n] {
                run += 1;
            } else {
                run = 1;
            }
            let anchor = p + 1 - k;
            if p + 1 >= k && anchor < n && run >= k {
                count += 1;
            }
        }
        count
    }
}
