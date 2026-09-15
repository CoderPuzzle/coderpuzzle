impl Solution {
    pub fn balanced_string(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let target = (n / 4) as i32;
        // Surplus letters are the only ones the window must cover.
        let idx = |b: u8| (b - b'A') as usize;
        let mut total = [0i32; 26];
        for &b in bytes {
            total[idx(b)] += 1;
        }
        let mut need = [0i32; 26];
        let mut kinds = 0;
        for c in 0..26 {
            if total[c] > target {
                need[c] = total[c] - target;
                kinds += 1;
            }
        }
        if kinds == 0 {
            return 0;
        }
        let mut window = [0i32; 26];
        let (mut served, mut best, mut left) = (0usize, n, 0usize);
        for right in 0..n {
            let c = idx(bytes[right]);
            if need[c] > 0 {
                window[c] += 1;
                if window[c] == need[c] {
                    served += 1;
                }
            }
            while served == kinds {
                best = best.min(right - left + 1);
                let lc = idx(bytes[left]);
                if need[lc] > 0 {
                    if window[lc] == need[lc] {
                        served -= 1;
                    }
                    window[lc] -= 1;
                }
                left += 1;
            }
        }
        best as i32
    }
}
