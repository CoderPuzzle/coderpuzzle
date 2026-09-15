impl Solution {
    pub fn nth_smallest(n: i64, k: i32) -> i64 {
        // Numbers with exactly k one bits and bit length exactly L are
        // C(L-1, k-1): a leading 1 plus k-1 ones among L-1 free slots, so
        // hockey-sticking over shorter lengths, C(L, k) candidates have
        // length <= L. Grow L until rank n fits, then unrank the rest
        // MSB -> LSB: placing 0 at position p leaves C(p, need) smaller
        // completions, so set the bit whenever the leftover rank exceeds
        // that block. Every binomial tops out at C(50, 25) ~ 1.26e14 and
        // the answer below 2^50 -- i64 arithmetic and 1i64 shifts carry
        // both, since 2^50 overflows i32.
        let k = k as usize;
        let mut C = [[0i64; 51]; 51];
        for i in 0..=50usize {
            C[i][0] = 1;
            for j in 1..=i {
                C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
            }
        }
        let mut length = k;
        while C[length][k] < n {
            length += 1;
        }
        let mut r = n - C[length - 1][k];
        let mut ans = 1i64 << (length - 1);
        let mut need = k - 1;
        for p in (0..length - 1).rev() {
            if r > C[p][need] {
                r -= C[p][need];
                ans |= 1i64 << p;
                need -= 1;
            }
        }
        ans
    }
}
