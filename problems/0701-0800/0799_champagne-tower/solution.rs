impl Solution {
    pub fn champagne_tower(poured: f64, query_row: i32, query_glass: i32) -> f64 {
        // Row-by-row simulation. row[j] is the total champagne glass j of the
        // current row has received; a full glass splits its excess equally
        // between the two glasses below, and rows below query_row never matter.
        let query_row = query_row as usize;
        let query_glass = query_glass as usize;
        let mut row = vec![poured];
        for _ in 0..query_row {
            let mut next = vec![0.0; row.len() + 1];
            for j in 0..row.len() {
                let excess = (row[j] - 1.0) / 2.0;
                if excess > 0.0 {
                    next[j] += excess;
                    next[j + 1] += excess;
                }
            }
            row = next;
        }
        row[query_glass].min(1.0)
    }
}
