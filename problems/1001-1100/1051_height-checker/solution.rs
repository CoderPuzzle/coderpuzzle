impl Solution {
    pub fn height_checker(heights: Vec<i32>) -> i32 {
        // The expected order is just heights sorted into non-decreasing
        // order. Compare position-by-position and count every mismatch.
        let mut expected = heights.clone();
        expected.sort();
        heights.iter().zip(expected.iter()).filter(|(a, b)| a != b).count() as i32
    }
}
