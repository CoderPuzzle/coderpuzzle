// Exclusive prefix/suffix folds: pre[i] folds nums[0..i-1] and suf[i]
// folds nums[i..n-1] for both GCD (identity 0) and LCM (identity 1).
// Removing index i leaves the fold of the two joins; the full-array fold
// covers removing nothing, and removing every element folds to score 0
// through the identities. Every LCM of a sub-multiset of values <= 30
// divides LCM(1..30) = 2329089562800 and the GCD is at most 30, so every
// intermediate product stays below 6987268688400, comfortably inside i64.
impl Solution {
    pub fn max_score(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut pre_g = vec![0i64; n + 1];
        let mut pre_l = vec![1i64; n + 1];
        let mut suf_g = vec![0i64; n + 1];
        let mut suf_l = vec![1i64; n + 1];
        for i in 0..n {
            let value = nums[i] as i64;
            pre_g[i + 1] = gcd64(pre_g[i], value);
            pre_l[i + 1] = pre_l[i] / gcd64(pre_l[i], value) * value;
        }
        for i in (0..n).rev() {
            let value = nums[i] as i64;
            suf_g[i] = gcd64(suf_g[i + 1], value);
            suf_l[i] = suf_l[i + 1] / gcd64(suf_l[i + 1], value) * value;
        }
        let mut best = pre_g[n] * pre_l[n];
        for i in 0..n {
            let g = gcd64(pre_g[i], suf_g[i + 1]);
            let l = pre_l[i] / gcd64(pre_l[i], suf_l[i + 1]) * suf_l[i + 1];
            best = best.max(g * l);
        }
        best
    }
}

fn gcd64(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}
