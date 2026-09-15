use std::collections::HashSet;

impl Solution {
    pub fn is_rectangle_cover(rectangles: Vec<Vec<i32>>) -> bool {
        // Two signatures of an exact cover, gathered in one pass: the piece
        // areas must sum to the bounding rectangle's area, and every interior
        // corner cancels, leaving exactly the bounding box's four corners.
        let mut area: i64 = 0;
        let mut min_x = i32::MAX;
        let mut min_y = i32::MAX;
        let mut max_a = i32::MIN;
        let mut max_b = i32::MIN;
        let mut corners: HashSet<(i32, i32)> = HashSet::new();
        for rectangle in &rectangles {
            let (x, y, a, b) = (rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
            area += (a - x) as i64 * (b - y) as i64;
            min_x = min_x.min(x);
            min_y = min_y.min(y);
            max_a = max_a.max(a);
            max_b = max_b.max(b);
            // Toggle: add when absent, remove when present, so a corner
            // shared by 2 or 4 pieces vanishes instead of accumulating.
            for corner in [(x, y), (x, b), (a, y), (a, b)] {
                if !corners.remove(&corner) {
                    corners.insert(corner);
                }
            }
        }
        corners.len() == 4
            && corners.contains(&(min_x, min_y))
            && corners.contains(&(min_x, max_b))
            && corners.contains(&(max_a, min_y))
            && corners.contains(&(max_a, max_b))
            && area == (max_a - min_x) as i64 * (max_b - min_y) as i64
    }
}
