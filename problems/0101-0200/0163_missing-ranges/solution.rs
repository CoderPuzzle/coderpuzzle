impl Solution {
    pub fn find_missing_ranges(nums: Vec<i32>, lower: i32, upper: i32) -> Vec<Vec<i32>> {
        // Ownership hands the input over, so the output is a fresh vector
        // and the walk only reads from nums.
        let mut ranges: Vec<Vec<i32>> = Vec::with_capacity(nums.len() + 1);
        // prev trails just behind the elements already visited; seeding it
        // with lower - 1 makes the gap before the first element an ordinary
        // interior gap instead of a special case.
        let mut prev = lower - 1;
        for &value in &nums {
            // A step of at least two between prev and value means at least
            // one integer sits strictly between them — one maximal gap,
            // because nums is sorted and unique.
            if value - prev >= 2 {
                ranges.push(vec![prev + 1, value - 1]);
            }
            prev = value;
        }
        // The tail is the same test with upper standing in as the final
        // boundary: a spread of at least one closes the gap, if any, after
        // the last element.
        if upper - prev >= 1 {
            ranges.push(vec![prev + 1, upper]);
        }
        ranges
    }
}
