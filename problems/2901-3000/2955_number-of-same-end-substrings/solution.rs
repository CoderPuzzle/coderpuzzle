impl Solution {
    pub fn same_end_substring_count(s: String, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // cnt[c][j] = occurrences of letter c in s[..j]. A query answer is
        // the sum over letters of t*(t+1)/2 for the range frequency t: every
        // position pairs with itself, and each equal pair of positions is
        // one same-end substring. Max answer 450015000 fits in i32.
        let n = s.len();
        let bytes = s.as_bytes();
        let mut cnt = vec![vec![0i32; n + 1]; 26];
        for j in 1..=n {
            for c in 0..26 {
                cnt[c][j] = cnt[c][j - 1];
            }
            cnt[(bytes[j - 1] - b'a') as usize][j] += 1;
        }
        let mut ans = Vec::with_capacity(queries.len());
        for q in queries.iter() {
            let l = q[0] as usize;
            let r = q[1] as usize;
            let mut total = 0i32;
            for c in 0..26 {
                let t = cnt[c][r + 1] - cnt[c][l];
                total += t * (t + 1) / 2;
            }
            ans.push(total);
        }
        ans
    }
}
