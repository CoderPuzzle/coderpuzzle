use std::collections::BTreeMap;

impl Solution {
    pub fn split_painting(segments: Vec<Vec<i32>>) -> Vec<Vec<i64>> {
        // Difference events per segment: +color at its start, -color at its
        // end. The mixed sum is piecewise constant and can only change at
        // these coordinates.
        let mut diff: BTreeMap<i64, i64> = BTreeMap::new();
        for seg in &segments {
            *diff.entry(seg[0] as i64).or_insert(0) += seg[2] as i64;
            *diff.entry(seg[1] as i64).or_insert(0) -= seg[2] as i64;
        }
        let keys: Vec<i64> = diff.keys().copied().collect();
        let mut result: Vec<Vec<i64>> = Vec::new();
        let mut running: i64 = 0;
        for i in 0..keys.len().saturating_sub(1) {
            // Between consecutive event coordinates the active set is fixed,
            // so running is the mixed color on that open interval. Colors
            // are distinct, so each event genuinely changes the sum --
            // emitting at every coordinate is minimal, not merely correct.
            running += diff[&keys[i]];
            if running > 0 {
                // skip unpainted gaps: nothing is active
                result.push(vec![keys[i], keys[i + 1], running]);
            }
        }
        result
    }
}
