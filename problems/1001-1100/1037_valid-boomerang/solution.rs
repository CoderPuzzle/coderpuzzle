impl Solution {
    pub fn is_boomerang(points: Vec<Vec<i32>>) -> bool {
        let (x1, y1) = (points[0][0] as i64, points[0][1] as i64);
        let (x2, y2) = (points[1][0] as i64, points[1][1] as i64);
        let (x3, y3) = (points[2][0] as i64, points[2][1] as i64);
        // Cross product of (p2 - p1) and (p3 - p1); zero exactly when the
        // two edge vectors are parallel, which also covers any duplicate
        // point (a zero vector is parallel to everything).
        let cross = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
        cross != 0
    }
}
