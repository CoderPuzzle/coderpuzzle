impl Solution {
    pub fn perfect_pairs(nums: Vec<i32>) -> i64 {
        // Signs never matter: with x = |a| <= y = |b| a pair is perfect
        // exactly when y <= 2x, so work in sorted absolute values and
        // count, for each i, the later entries within double of a[i].
        let mut a: Vec<i64> = nums.iter().map(|&v| v.abs() as i64).collect();
        a.sort_unstable();
        // The doubled bound 2 * a[i] never shrinks as i moves right, so
        // the frontier j only ever advances; positions strictly between
        // i and j pair with i. Counts reach ~5e9, hence i64.
        let mut ans: i64 = 0;
        let mut j = 0usize;
        for i in 0..a.len() {
            while j < a.len() && a[j] <= 2 * a[i] {
                j += 1;
            }
            ans += (j - i - 1) as i64;
        }
        ans
    }
}
