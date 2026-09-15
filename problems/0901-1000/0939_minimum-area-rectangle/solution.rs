use std::collections::HashSet;

impl Solution {
    pub fn min_area_rect(points: Vec<Vec<i32>>) -> i32 {
        // A rectangle with sides parallel to the axes is pinned by two
        // opposite corners: (x1, y1) and (x2, y2) with x1 != x2 and
        // y1 != y2 close one exactly when (x1, y2) and (x2, y1) are also
        // present, and its area is |x1 - x2| * |y1 - y2|. So every point
        // goes into a set, every pair is tried as a candidate diagonal,
        // and two O(1) membership tests decide whether the rectangle
        // exists at all.
        let seen: HashSet<(i32, i32)> = points.iter().map(|p| (p[0], p[1])).collect();
        let n = points.len();
        let mut best = 0;
        for i in 0..n {
            let (x1, y1) = (points[i][0], points[i][1]);
            for j in (i + 1)..n {
                let (x2, y2) = (points[j][0], points[j][1]);
                if x1 != x2 && y1 != y2 && seen.contains(&(x1, y2)) && seen.contains(&(x2, y1)) {
                    let area = (x1 - x2).abs() * (y1 - y2).abs();
                    if best == 0 || area < best {
                        best = area;
                    }
                }
            }
        }
        best
    }
}
