impl Solution {
    pub fn decompress_rle_list(nums: Vec<i32>) -> Vec<i32> {
        // Size the output up front: it is the sum of all frequencies.
        let total: usize = nums.chunks(2).map(|pair| pair[0] as usize).sum();
        let mut out = Vec::with_capacity(total);
        for pair in nums.chunks(2) {
            for _ in 0..pair[0] {
                out.push(pair[1]);
            }
        }
        out
    }
}
