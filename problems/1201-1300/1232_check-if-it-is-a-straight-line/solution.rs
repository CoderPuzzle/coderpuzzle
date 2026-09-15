impl Solution {
    pub fn check_straight_line(coordinates: Vec<Vec<i32>>) -> bool {
        let (x1, y1) = (coordinates[0][0] as i64, coordinates[0][1] as i64);
        let (x2, y2) = (coordinates[1][0] as i64, coordinates[1][1] as i64);
        // Cross product against the first two points: zero means the vector
        // is parallel to the fixed direction, vertical lines included.
        for point in coordinates.iter().skip(2) {
            let (x, y) = (point[0] as i64, point[1] as i64);
            if (x - x1) * (y2 - y1) != (y - y1) * (x2 - x1) {
                return false;
            }
        }
        true
    }
}
