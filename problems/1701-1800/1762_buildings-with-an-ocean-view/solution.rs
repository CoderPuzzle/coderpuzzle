impl Solution {
    pub fn find_buildings(heights: Vec<i32>) -> Vec<i32> {
        // A building sees the ocean iff it strictly exceeds the max of
        // everything to its right; sweep inland carrying that max.
        let mut out: Vec<i32> = Vec::new();
        let mut tallest = 0;
        for i in (0..heights.len()).rev() {
            if heights[i] > tallest {
                out.push(i as i32);
                tallest = heights[i];
            }
        }
        out.reverse();
        out
    }
}
