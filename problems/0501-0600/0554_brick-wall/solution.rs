use std::collections::HashMap;

impl Solution {
    pub fn least_bricks(wall: Vec<Vec<i32>>) -> i32 {
        let mut edge_counts: HashMap<i32, i32> = HashMap::new();
        // Flip the question: a line at position p crosses a row unless that
        // row has a brick edge at p, so count edges per position.
        for row in &wall {
            // 64-bit accumulator: cumulative widths can exceed 32-bit range.
            let mut position: i64 = 0;
            // Prefix sums excluding the last brick: the final cumulative
            // width is the wall's right border, which is forbidden.
            for &width in row.iter().take(row.len().saturating_sub(1)) {
                position += width as i64;
                *edge_counts.entry(position as i32).or_insert(0) += 1;
            }
        }
        // Rows minus the most-shared edge position; 0 covers walls where
        // every row is a single brick.
        let best_edges = edge_counts.values().copied().max().unwrap_or(0);
        wall.len() as i32 - best_edges
    }
}
