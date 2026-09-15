impl Solution {
    pub fn reverse_subarrays(nums: Vec<i32>, k: i32) -> Vec<i32> {
        // Each block holds m = n / k elements. A two-pointer sweep swaps
        // the ends of a block inward, mirroring the "Two Pointers" tag,
        // and the blocks are visited left to right; the clone keeps the
        // input array untouched.
        let m = nums.len() / k as usize;
        let mut result = nums.clone();
        for start in (0..nums.len()).step_by(m) {
            let mut i = start;
            let mut j = start + m - 1;
            while i < j {
                result.swap(i, j);
                i += 1;
                j -= 1;
            }
        }
        result
    }
}
