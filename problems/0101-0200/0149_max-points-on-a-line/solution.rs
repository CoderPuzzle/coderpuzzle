use std::collections::HashMap;

impl Solution {
    pub fn max_points(points: Vec<Vec<i32>>) -> i32 {
        // Anchor each point in turn and bucket every later point by the
        // direction from the anchor: on any one line through the anchor all
        // other members share that direction, and the best line is counted
        // in full when the anchor is its earliest point.
        let mut best = 1;
        for i in 0..points.len() {
            let mut counts: HashMap<(i32, i32), i32> = HashMap::new();
            for j in i + 1..points.len() {
                let mut dx = points[j][0] - points[i][0];
                let mut dy = points[j][1] - points[i][1];
                // Reduce to lowest terms, then canonicalize the sign so the
                // two readings of one line collapse onto a single key:
                // exact integers, never a floating-point slope.
                let g = gcd(dx.unsigned_abs(), dy.unsigned_abs()) as i32;
                dx /= g;
                dy /= g;
                if dx < 0 || (dx == 0 && dy < 0) {
                    dx = -dx;
                    dy = -dy;
                }
                *counts.entry((dx, dy)).or_insert(0) += 1;
            }
            for count in counts.values() {
                best = best.max(count + 1);
            }
        }
        best
    }
}

// Euclid's algorithm on absolute values, so it also reduces directions
// that point down or left.
fn gcd(mut a: u32, mut b: u32) -> u32 {
    while b != 0 {
        let remainder = a % b;
        a = b;
        b = remainder;
    }
    a
}
