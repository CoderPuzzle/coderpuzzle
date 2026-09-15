impl Solution {
    pub fn count_palindromes(s: String) -> i32 {
        // A length-5 palindrome has the shape a b c b a. Iterate over each
        // position as the center c: the "ab" pair must sit strictly before
        // it and the "ba" pair strictly after. A suffix table answers the
        // right side for every center in 100 lookups; the left side grows
        // on the fly during the same left-to-right sweep.
        const MOD: i64 = 1_000_000_007;
        let bytes = s.as_bytes();
        let n = bytes.len();
        let digits: Vec<i32> = bytes.iter().map(|&c| (c - b'0') as i32).collect();

        // suff[i][a][b] = number of "ab" subsequences in s[i:]
        let mut suff = vec![[[0i32; 10]; 10]; n + 1];
        let mut cnt = [0i32; 10]; // digit counts in the current suffix s[i:]
        for i in (0..n).rev() {
            let d = digits[i] as usize;
            suff[i] = suff[i + 1];
            for b in 0..10 {
                suff[i][d][b] += cnt[b]; // pairs (i, j) whose first char is s[i]
            }
            cnt[d] += 1;
        }

        // left[a][b] = number of "ab" subsequences in s[:k]
        let mut left = [[0i32; 10]; 10];
        let mut lcnt = [0i32; 10]; // digit counts in s[:k]
        let mut ans: i64 = 0;
        for k in 0..n {
            let d = digits[k] as usize;
            for a in 0..10 {
                for b in 0..10 {
                    ans = (ans + left[a][b] as i64 * suff[k + 1][b][a] as i64) % MOD;
                }
            }
            for a in 0..10 {
                left[a][d] += lcnt[a]; // pairs (p, k) whose second char is s[k]
            }
            lcnt[d] += 1;
        }
        ans as i32
    }
}
