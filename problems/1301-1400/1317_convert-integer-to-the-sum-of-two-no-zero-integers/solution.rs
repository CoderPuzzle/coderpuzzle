impl Solution {
    pub fn get_no_zero_integers(n: i32) -> Vec<i32> {
        // Smallest-a decomposition: arithmetic digit test, no strings.
        fn no_zero(mut x: i32) -> bool {
            while x > 0 {
                if x % 10 == 0 {
                    return false;
                }
                x /= 10;
            }
            true
        }
        for a in 1..n {
            if no_zero(a) && no_zero(n - a) {
                return vec![a, n - a];
            }
        }
        Vec::new()
    }
}
