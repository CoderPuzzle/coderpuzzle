impl Solution {
    pub fn best_tower(towers: Vec<Vec<i32>>, center: Vec<i32>, radius: i32) -> Vec<i32> {
        let (cx, cy) = (center[0], center[1]);
        let mut best: Option<Vec<i32>> = None;
        let mut best_quality = -1;
        for tower in &towers {
            let (x, y, quality) = (tower[0], tower[1], tower[2]);
            if (x - cx).abs() + (y - cy).abs() > radius {
                continue;
            }
            // Strictly better quality wins; on a quality tie the
            // lexicographically smaller coordinate wins.
            let better = match &best {
                None => true,
                Some(b) => quality > best_quality || (quality == best_quality && (x < b[0] || (x == b[0] && y < b[1]))),
            };
            if better {
                best = Some(vec![x, y]);
                best_quality = quality;
            }
        }
        best.unwrap_or(vec![-1, -1])
    }
}
