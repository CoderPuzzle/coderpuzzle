use std::collections::BTreeSet;

impl Solution {
    pub fn closest_room(rooms: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = rooms.len();
        let mut rooms_by_size: Vec<usize> = (0..n).collect();
        rooms_by_size.sort_by(|&a, &b| rooms[b][1].cmp(&rooms[a][1]));
        // Offline trick: process queries by decreasing minSize so rooms only accumulate.
        let mut query_order: Vec<usize> = (0..queries.len()).collect();
        query_order.sort_by(|&a, &b| queries[b][1].cmp(&queries[a][1]));
        let mut ids: BTreeSet<i32> = BTreeSet::new();
        let mut answers = vec![0i32; queries.len()];
        let mut ri = 0usize;
        for &j in &query_order {
            let preferred = queries[j][0];
            let min_size = queries[j][1];
            // Every room with size >= min_size qualifies; once inserted it stays
            // valid for all later queries (their thresholds are only smaller).
            while ri < n && rooms[rooms_by_size[ri]][1] >= min_size {
                ids.insert(rooms[rooms_by_size[ri]][0]);
                ri += 1;
            }
            // Largest id < preferred and smallest id >= preferred.
            let floor = ids.range(..preferred).next_back().copied();
            let ceil = ids.range(preferred..).next().copied();
            let mut best = -1i32; // stays -1 when no room met the size requirement
            let mut best_dist: Option<i64> = None;
            if let Some(f) = floor {
                best = f;
                best_dist = Some(preferred as i64 - f as i64);
            }
            // Strict < keeps floor (the smaller id) when the distances tie.
            if let Some(c) = ceil {
                let d = c as i64 - preferred as i64;
                if best_dist.map_or(true, |b| d < b) {
                    best = c;
                }
            }
            answers[j] = best; // write via saved index: original order kept
        }
        answers
    }
}
