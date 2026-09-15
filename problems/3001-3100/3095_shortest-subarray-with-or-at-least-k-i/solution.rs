impl Solution {
    pub fn minimum_subarray_length(nums: Vec<i32>, k: i32) -> i32 {
        // Fix the right endpoint and extend left with a running OR of
        // nums[l..r]; the first l reaching k is the shortest special
        // subarray ending at r. With values <= 50 the OR stays below 64,
        // so i32 is roomy throughout.
        let mut best = -1;
        for r in 0..nums.len() {
            let mut current = 0;
            for l in (0..=r).rev() {
                current |= nums[l];
                if current >= k {
                    let length = (r - l + 1) as i32;
                    if best == -1 || length < best {
                        best = length;
                    }
                    break;
                }
            }
        }
        best
    }
}
