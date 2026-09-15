use std::collections::BinaryHeap;

impl Solution {
    pub fn get_skyline(buildings: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // events: (x, kind, key, right); key = -height for start, +height for end
        let mut events: Vec<(i32, i32, i32, i32)> = Vec::with_capacity(buildings.len() * 2);
        for b in &buildings {
            let (left, right, height) = (b[0], b[1], b[2]);
            events.push((left, 0, -height, right));
            events.push((right, 1, height, right));
        }
        // Tuple sorting encodes the tie-breaking: starts (kind 0) before ends
        // (kind 1) at equal x so adjacent buildings hand off without a dip to
        // ground; taller starts first (-height); shorter ends first so a tall
        // building survives until its own right edge.
        events.sort();

        // max-heap of (height, right) with lazy removal; sentinel ground level
        let mut heap: BinaryHeap<(i32, i32)> = BinaryHeap::new();
        heap.push((0, i32::MAX));

        let mut result: Vec<Vec<i32>> = Vec::new();
        let mut previous_height = 0;
        for &(x, kind, key, right) in &events {
            // Lazy removal: pop top entries whose building has ended; stale
            // entries below the top are harmless until they surface.
            while let Some(&top) = heap.peek() {
                if top.1 <= x {
                    heap.pop();
                } else {
                    break;
                }
            }
            if kind == 0 {
                heap.push((-key, right));
            }
            let current_height = heap.peek().map(|t| t.0).unwrap_or(0);
            // Emit a key point only when the contour height actually changes,
            // which also merges consecutive equal-height segments.
            if current_height != previous_height {
                result.push(vec![x, current_height]);
                previous_height = current_height;
            }
        }
        result
    }
}
