impl Solution {
    pub fn largest_combination(candidates: Vec<i32>) -> i32 {
        let mut counts = [0_i32; 24];
        for &value in &candidates {
            for bit in 0..24 {
                if ((value >> bit) & 1) == 1 {
                    counts[bit] += 1;
                }
            }
        }
        counts.into_iter().max().unwrap()
    }
}
