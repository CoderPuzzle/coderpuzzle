// All increases come first, all duplicates last: a final array of m equal
// values v costs v - 1 increases plus m - 1 duplicates and sums to m * v.
// Enumerate the single-element value v and take ceil(k / v) - 1 duplicates;
// the best split wins. With k <= 10^5 every sum fits an i32 comfortably.
impl Solution {
    pub fn min_operations(k: i32) -> i32 {
        let mut best = k - 1;
        for v in 1..=k {
            let dup = ((k + v - 1) / v - 1).max(0);
            best = best.min(v - 1 + dup);
        }
        best
    }
}
