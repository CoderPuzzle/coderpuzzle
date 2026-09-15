impl Solution {
    pub fn take_characters(s: String, k: i32) -> i32 {
        // Equivalently: keep the longest middle stretch whose letter counts
        // stay at or under total - k; the ends taken to delete it are then
        // k of each letter or more. Answer = n - that longest window.
        let bytes = s.as_bytes();
        let n = bytes.len() as i32;
        let mut total = [0i64; 3];
        for &b in bytes {
            total[(b - b'a') as usize] += 1;
        }
        if total.iter().any(|&c| c < k as i64) {
            return -1;
        }
        let mut window = [0i64; 3];
        let mut left = 0usize;
        let mut best = 0i32;
        for (right, &b) in bytes.iter().enumerate() {
            window[(b - b'a') as usize] += 1;
            while (0..3).any(|c| window[c] > total[c] - k as i64) {
                window[(bytes[left] - b'a') as usize] -= 1;
                left += 1;
            }
            best = best.max((right - left + 1) as i32);
        }
        n - best
    }
}
