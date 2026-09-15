impl Solution {
    pub fn gcd_of_odd_even_sums(n: i32) -> i32 {
        // Closed forms: the first n odds sum to n * n (pairs around the
        // middle total 2n), the first n evens sum to n * (n + 1). Factoring
        // out the shared n leaves gcd(n, n + 1) = 1 -- consecutive integers
        // are coprime -- so the answer collapses to n itself.
        n
    }
}
