use std::collections::HashMap;

impl Solution {
    pub fn max_intersection_count(y: Vec<i32>) -> i32 {
        // The count only changes when the line passes a vertex height, so
        // testing each compressed height v just above (v + 0.5) and exactly
        // at v suffices. Every segment stamps its half-level range
        // [lo, hi - 1] and its strict interior [lo + 1, hi - 1] into two
        // difference arrays; a prefix pass then reads both counts per
        // height, the at-level one plus a point for each vertex on the line.
        let mut heights = y.clone();
        heights.sort_unstable();
        heights.dedup();
        let mut rank: HashMap<i32, usize> = HashMap::with_capacity(heights.len());
        for (i, &h) in heights.iter().enumerate() {
            rank.insert(h, i);
        }
        let mut above = vec![0i32; heights.len()];
        let mut at = vec![0i32; heights.len()];
        for pair in y.windows(2) {
            let (lo, hi) = (pair[0].min(pair[1]), pair[0].max(pair[1]));
            above[rank[&lo]] += 1;
            above[rank[&hi]] -= 1;
            if hi - lo > 1 {
                at[rank[&lo] + 1] += 1;
                at[rank[&hi]] -= 1;
            }
        }
        let mut seen: HashMap<i32, i32> = HashMap::with_capacity(heights.len());
        for &v in &y {
            *seen.entry(v).or_insert(0) += 1;
        }
        let mut best = 0;
        let mut spans_above = 0;
        let mut spans_at = 0;
        for (i, &h) in heights.iter().enumerate() {
            spans_above += above[i];
            spans_at += at[i];
            best = best.max(spans_above).max(spans_at + seen[&h]);
        }
        best
    }
}
