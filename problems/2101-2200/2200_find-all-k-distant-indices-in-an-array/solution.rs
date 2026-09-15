impl Solution {
    pub fn find_k_distant_indices(nums: Vec<i32>, key: i32, k: i32) -> Vec<i32> {
        let mut out: Vec<i32> = Vec::new();
        let mut next_free = 0i32;
        let n = nums.len() as i32;
        // each key occurrence contributes the window [j-k, j+k]; windows
        // are naturally ordered, so clip against what's already emitted
        // instead of deduplicating through a set
        for j in 0..n {
            if nums[j as usize] != key {
                continue;
            }
            let lo = next_free.max(j - k);
            let hi = (n - 1).min(j + k);
            out.extend(lo..=hi);
            next_free = hi + 1;
        }
        out
    }
}
