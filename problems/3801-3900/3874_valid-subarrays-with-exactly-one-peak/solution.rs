impl Solution {
    // Each peak is the only peak in exactly those subarrays whose left
    // endpoint stays past the previous peak and whose right endpoint stays
    // before the next peak, both also within k of the peak. The count can
    // reach (n/2+1)*(n/2) on a single-peaked array, so the total is an i64.
    pub fn valid_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let k = k as usize;
        let mut peaks = Vec::new();
        for i in 1..n.saturating_sub(1) {
            if nums[i] > nums[i - 1] && nums[i] > nums[i + 1] {
                peaks.push(i);
            }
        }
        let mut total: i64 = 0;
        for (idx, &i) in peaks.iter().enumerate() {
            let prev = if idx > 0 { peaks[idx - 1] as i64 } else { -1 };
            let nxt = if idx + 1 < peaks.len() {
                peaks[idx + 1] as i64
            } else {
                n as i64
            };
            let lo = std::cmp::max(i as i64 - k as i64, prev + 1);
            let hi = std::cmp::min(i as i64 + k as i64, nxt - 1);
            total += (i as i64 - lo + 1) * (hi - i as i64 + 1);
        }
        total
    }
}
