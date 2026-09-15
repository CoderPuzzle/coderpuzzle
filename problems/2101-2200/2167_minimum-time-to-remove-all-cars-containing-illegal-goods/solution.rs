impl Solution {
    pub fn minimum_time(s: String) -> i32 {
        let n = s.len() as i32;
        // cost(l, r) = l + (n - r) + 2 * count1(s[l:r])
        //            = n + sum over kept chars of (1 if '1' else -1).
        // Minimize by taking the minimum subarray sum (empty subarray allowed).
        let mut min_end: i32 = 0;
        let mut best: i32 = 0;
        for &b in s.as_bytes() {
            let value: i32 = if b == b'1' { 1 } else { -1 };
            min_end = value.min(min_end + value);
            best = best.min(min_end);
        }
        n + best
    }
}
