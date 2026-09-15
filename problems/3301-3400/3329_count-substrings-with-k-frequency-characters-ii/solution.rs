impl Solution {
    pub fn number_of_substrings(s: String, k: i32) -> i64 {
        let n = s.len();
        let s = s.as_bytes();
        let mut count = [0i32; 26];
        let mut sat = 0i32; // number of characters whose window count has reached k
        let mut r = 0usize;
        let mut total = 0i64;
        for l in 0..n {
            // Window is [l, r). Extend until some character reaches count
            // k: validity only grows as the window widens, so the first
            // end that works for l also works for every larger end.
            while r < n && sat == 0 {
                let c = (s[r] - b'a') as usize;
                count[c] += 1;
                if count[c] == k {
                    sat += 1;
                }
                r += 1;
            }
            if sat == 0 {
                break; // no window from l (or any later l) can become valid
            }
            // [l, r - 1] is the minimal valid window from l, so exactly
            // the ends r - 1 .. n - 1 are valid: n - (r - 1) substrings.
            total += (n - (r - 1)) as i64;
            let c = (s[l] - b'a') as usize;
            if count[c] == k {
                sat -= 1;
            }
            count[c] -= 1;
        }
        total
    }
}
