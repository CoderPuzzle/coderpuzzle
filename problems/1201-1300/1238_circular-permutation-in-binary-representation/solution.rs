impl Solution {
    pub fn circular_permutation(n: i32, start: i32) -> Vec<i32> {
        // Reflected gray code g(i) = i ^ (i >> 1); XOR-ing every entry by
        // start preserves the one-bit-step property and lands p[0] = start.
        let size = 1usize << n;
        (0..size).map(|i| start ^ (i as i32 ^ ((i >> 1) as i32))).collect()
    }
}
