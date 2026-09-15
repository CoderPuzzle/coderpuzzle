use std::collections::HashMap;

impl Solution {
    pub fn number_of_boomerangs(points: Vec<Vec<i32>>) -> i32 {
        let mut total: i64 = 0;
        for i in 0..points.len() {
            // A boomerang is pinned by its apex: the other two points merely
            // have to sit at the same distance from it, so group every other
            // point by squared distance — equal squares mean equal lengths,
            // and no square root ever gets the chance to round.
            let mut counts: HashMap<i64, i32> = HashMap::new();
            for j in 0..points.len() {
                if i == j {
                    continue;
                }
                let dx = (points[j][0] - points[i][0]) as i64;
                let dy = (points[j][1] - points[i][1]) as i64;
                *counts.entry(dx * dx + dy * dy).or_insert(0) += 1;
            }
            // c points at one distance fill the two ordered slots of the
            // tuple in c * (c - 1) ways — either of them may come first.
            for &c in counts.values() {
                total += (c * (c - 1)) as i64;
            }
        }
        total as i32
    }
}
