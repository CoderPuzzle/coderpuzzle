pub struct NumArray {
    // prefix[i] = sum of the first i elements, with prefix[0] = 0 so no
    // query needs a special case for a left edge of zero. Held in i64:
    // prefix sums of 32-bit values.
    prefix: Vec<i64>,
}

impl NumArray {
    pub fn new(nums: Vec<i32>) -> Self {
        let mut prefix = vec![0i64; nums.len() + 1];
        // One left-to-right pass; each entry extends the previous by one
        // element. The array is fixed, so summing happens once, not per
        // query.
        for (index, value) in nums.iter().enumerate() {
            prefix[index + 1] = prefix[index] + *value as i64;
        }
        NumArray { prefix }
    }

    pub fn sumRange(&mut self, left: i32, right: i32) -> i64 {
        // The elements before left cancel, telescoping the range sum
        // into a difference of two prefixes — O(1) per query.
        self.prefix[right as usize + 1] - self.prefix[left as usize]
    }
}
