// Every triangle is three of the points, and at most C(50,3) = 19,600
// triples is few enough to enumerate them all: three nested loops over
// i < j < k keep the largest area. The area is half the absolute cross
// product of the edge vectors b - a and c - a, kept in exact integers
// until the single final division by 2 — a power of two, so the returned
// double is exact and a degenerate (collinear) triple simply contributes
// area 0.
impl Solution {
    pub fn largest_triangle_area(points: Vec<Vec<i32>>) -> f64 {
        let n = points.len();
        let mut best = 0.0;
        for i in 0..n {
            let ax = points[i][0];
            let ay = points[i][1];
            for j in i + 1..n {
                let ux = (points[j][0] - ax) as i64;
                let uy = (points[j][1] - ay) as i64;
                for k in j + 1..n {
                    // The cross stays in an i64: exact for coordinates up
                    // to 50 in magnitude, and never truncated to 32 bits.
                    let cross = ux * (points[k][1] - ay) as i64 - uy * (points[k][0] - ax) as i64;
                    let area = cross.abs() as f64 / 2.0;
                    if area > best {
                        best = area;
                    }
                }
            }
        }
        best
    }
}
