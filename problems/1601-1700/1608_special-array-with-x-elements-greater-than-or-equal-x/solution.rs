impl Solution {
    pub fn special_array(nums: Vec<i32>) -> i32 {
        // Sort descending: for candidate x = i, the i-th largest element
        // must still be >= i while the next one drops below it (or i is
        // the last position), which is exactly "i elements are >= i".
        let n = nums.len() as i32;
        let mut sorted = nums;
        sorted.sort_unstable_by(|a, b| b.cmp(a));
        for i in 1..=n {
            let idx = (i - 1) as usize;
            if sorted[idx] >= i && (i == n || sorted[idx + 1] < i) {
                return i;
            }
        }
        // Every element is non-negative, so x = 0 would need an empty
        // array; nothing else worked, so the array is not special.
        -1
    }
}
