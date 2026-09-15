impl Solution {
    pub fn gray_code(n: i32) -> Vec<i32> {
        // The pinned order is its own recipe: element at index i is i ^ (i >> 1),
        // the standard reflected gray code. One loop, no post-processing.
        (0..(1u32 << n)).map(|i| (i ^ (i >> 1)) as i32).collect()
    }
}
