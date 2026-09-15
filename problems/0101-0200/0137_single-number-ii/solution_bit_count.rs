impl Solution {
    pub fn single_number(nums: Vec<i32>) -> i32 {
        let mut result: u32 = 0;
        for i in 0..32 {
            // Triples contribute 0 or 3 set bits at position i (a multiple of
            // three); the unique value contributes 0 or 1 — so count % 3 is
            // exactly bit i of the answer.
            let mut count = 0;
            for &value in &nums {
                count += ((value >> i) & 1) as usize;
            }
            if count % 3 != 0 {
                result |= 1u32 << i;
            }
        }
        // Reinterpret the assembled bit pattern as a signed 32-bit int.
        result as i32
    }
}
