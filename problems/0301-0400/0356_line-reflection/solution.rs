use std::collections::HashSet;

impl Solution {
    pub fn is_reflected(points: Vec<Vec<i32>>) -> bool {
        // Reflection swaps the extreme columns, so the only axis that can
        // work is x = (min_x + max_x) / 2: pin the sum s = min_x + max_x.
        let mut min_x = points[0][0];
        let mut max_x = points[0][0];
        for point in &points {
            min_x = min_x.min(point[0]);
            max_x = max_x.max(point[0]);
        }
        let s = min_x + max_x;
        let seen: HashSet<(i32, i32)> = points.iter().map(|point| (point[0], point[1])).collect();
        // The axis may fall between columns, so mirror with the integer sum:
        // every point needs its partner (s - x, y) in the set, where repeated
        // points simply collapse.
        points.iter().all(|point| seen.contains(&(s - point[0], point[1])))
    }
}
