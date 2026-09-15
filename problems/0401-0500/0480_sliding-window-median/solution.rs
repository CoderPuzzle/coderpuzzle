impl Solution {
    pub fn median_sliding_window(nums: Vec<i32>, k: i32) -> Vec<f64> {
        let k = k as usize;
        // One sorted vector mirrors the window: binary insertion keeps it
        // sorted without ever re-sorting a whole window.
        let mut window: Vec<i32> = Vec::with_capacity(nums.len());
        let mut out: Vec<f64> = Vec::with_capacity(nums.len() + 1 - k);
        for i in 0..nums.len() {
            let x = nums[i];
            let pos = window.partition_point(|&v| v < x);
            window.insert(pos, x);
            // Evict the leftmost occurrence of the outgoing value — equal
            // elements are interchangeable, so the multiset stays exact.
            if i >= k {
                let t = nums[i - k];
                let p = window.partition_point(|&v| v < t);
                window.remove(p);
            }
            // Eviction already ran, so exactly k values are present here;
            // the median is then a plain index lookup (middle pair for
            // even k, averaged as f64).
            if i + 1 >= k {
                if k % 2 == 1 {
                    out.push(window[k / 2] as f64);
                } else {
                    out.push((window[k / 2 - 1] as f64 + window[k / 2] as f64) / 2.0);
                }
            }
        }
        out
    }
}
