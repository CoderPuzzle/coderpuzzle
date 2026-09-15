impl Solution {
    pub fn nearest_valid_point(x: i32, y: i32, points: Vec<Vec<i32>>) -> i32 {
        // A valid point already agrees with one coordinate, so its Manhattan
        // distance is just the absolute gap on the other coordinate.
        let mut best_dist = i32::MAX;
        let mut best_index: i32 = -1;
        for (i, point) in points.iter().enumerate() {
            let (a, b) = (point[0], point[1]);
            if a == x || b == y {
                let dist = if a == x { (b - y).abs() } else { (a - x).abs() };
                // Strict improvement only: an equal distance keeps the earlier
                // index, which is exactly the statement's tie rule.
                if dist < best_dist {
                    best_dist = dist;
                    best_index = i as i32;
                }
            }
        }
        best_index
    }
}
