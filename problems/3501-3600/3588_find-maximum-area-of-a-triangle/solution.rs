use std::collections::HashMap;

impl Solution {
    pub fn max_area(coords: Vec<Vec<i32>>) -> i64 {
        // A valid triangle needs a horizontal or vertical side. On a
        // horizontal line y the widest base is the x-span of that
        // line, and the tallest apex is the global top or bottom
        // point, whichever lies off the line — so every line
        // contributes two O(1) candidates once points are grouped.
        // Vertical sides mirror this. 2 * area <= 2 * (10^6)^2, so
        // i64 math is required.
        let mut by_y: HashMap<i32, Vec<i32>> = HashMap::new();
        let mut by_x: HashMap<i32, Vec<i32>> = HashMap::new();
        for p in &coords {
            by_y.entry(p[1]).or_default().push(p[0]);
            by_x.entry(p[0]).or_default().push(p[1]);
        }
        let gxmin = *by_x.keys().min().unwrap();
        let gxmax = *by_x.keys().max().unwrap();
        let gymin = *by_y.keys().min().unwrap();
        let gymax = *by_y.keys().max().unwrap();
        let mut best: i64 = -1;
        for (&y, row) in by_y.iter() {
            if row.len() < 2 {
                continue;
            }
            let lo = *row.iter().min().unwrap();
            let hi = *row.iter().max().unwrap();
            if gymax != y {
                best = best.max((hi - lo) as i64 * (gymax - y) as i64);
            }
            if gymin != y {
                best = best.max((hi - lo) as i64 * (y - gymin) as i64);
            }
        }
        for (&x, col) in by_x.iter() {
            if col.len() < 2 {
                continue;
            }
            let lo = *col.iter().min().unwrap();
            let hi = *col.iter().max().unwrap();
            if gxmax != x {
                best = best.max((hi - lo) as i64 * (gxmax - x) as i64);
            }
            if gxmin != x {
                best = best.max((hi - lo) as i64 * (x - gxmin) as i64);
            }
        }
        best
    }
}
