impl Solution {
    pub fn valid_square(p1: Vec<i32>, p2: Vec<i32>, p3: Vec<i32>, p4: Vec<i32>) -> bool {
        let points = [p1, p2, p3, p4];
        let mut d2: Vec<i64> = Vec::with_capacity(6);
        // Six pairs hide among four points — four sides and two diagonals.
        // Grouping by squared length compares exactly what distances
        // compare, so no square root ever gets the chance to round.
        for i in 0..4 {
            for j in (i + 1)..4 {
                let dx = (points[j][0] - points[i][0]) as i64;
                let dy = (points[j][1] - points[i][1]) as i64;
                d2.push(dx * dx + dy * dy);
            }
        }
        d2.sort_unstable();
        // Sorted, a square is exactly the multiset a, a, a, a, b, b: the
        // four equal sides come first and the two equal diagonals after,
        // with a > 0 so a collapsed point cannot pose as a side.
        d2[0] > 0 && d2[0] == d2[3] && d2[4] == d2[5] && d2[3] != d2[4]
    }
}
