impl Solution {
    pub fn min_time_to_visit_all_points(points: Vec<Vec<i32>>) -> i32 {
        // Each second closes at most one unit of each axis (the diagonal),
        // so a leg takes exactly max(|dx|, |dy|) seconds — walk diagonally
        // while both gaps are open, then straight along what remains.
        let mut total = 0;
        for pair in points.windows(2) {
            let dx = (pair[1][0] - pair[0][0]).abs();
            let dy = (pair[1][1] - pair[0][1]).abs();
            total += dx.max(dy);
        }
        total
    }
}
