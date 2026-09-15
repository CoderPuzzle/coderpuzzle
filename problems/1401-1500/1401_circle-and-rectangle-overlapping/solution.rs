impl Solution {
    pub fn check_overlap(radius: i32, xCenter: i32, yCenter: i32, x1: i32, y1: i32, x2: i32, y2: i32) -> bool {
        // The nearest point of an axis-aligned box to any point is found
        // coordinate-wise: clamp each coordinate into the box's interval.
        let nearest_x = x1.max(xCenter.min(x2));
        let nearest_y = y1.max(yCenter.min(y2));
        let dx = xCenter - nearest_x;
        let dy = yCenter - nearest_y;
        dx * dx + dy * dy <= radius * radius
    }
}
