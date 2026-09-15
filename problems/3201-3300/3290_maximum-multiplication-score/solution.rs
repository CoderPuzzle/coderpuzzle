// dp[t][j] = best score using the first j elements of b with exactly t picks
// made; dp[t][j] = max(dp[t][j-1], dp[t-1][j-1] + a[t-1] * b[j]). Each row
// reads only the previous row, so four rolling variables carry everything;
// update counts from high to low so each element is consumed at most once.
// Scores reach +-4e10, past the 32-bit range.
impl Solution {
    pub fn max_score(a: Vec<i32>, b: Vec<i32>) -> i64 {
        const NINF: i64 = -(1i64 << 62);
        let mut d1 = NINF;
        let mut d2 = NINF;
        let mut d3 = NINF;
        let mut d4 = NINF;
        for &x in &b {
            let x = x as i64;
            if d3 != NINF {
                d4 = d4.max(d3 + a[3] as i64 * x);
            }
            if d2 != NINF {
                d3 = d3.max(d2 + a[2] as i64 * x);
            }
            if d1 != NINF {
                d2 = d2.max(d1 + a[1] as i64 * x);
            }
            d1 = d1.max(a[0] as i64 * x);
        }
        d4
    }
}
