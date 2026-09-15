impl Solution {
    pub fn count_commas(n: i32) -> i32 {
        // A number carries a comma exactly when it has at least four digits,
        // and every number from 1000 to 10^5 (the bound here) has exactly
        // one comma. The answer is how many integers lie in [1000, n]:
        // n - 999, or 0 when n is smaller.
        (n - 999).max(0)
    }
}
