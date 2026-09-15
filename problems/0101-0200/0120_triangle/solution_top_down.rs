impl Solution {
    pub fn minimum_total(triangle: Vec<Vec<i32>>) -> i32 {
        // Top-down mirror of the bottom-up DP: best[i] = minimum path sum
        // from the apex down to column i of the current row. Sums
        // accumulate in i64s for headroom.
        let mut best: Vec<i64> = vec![triangle[0][0] as i64];
        for row in triangle.iter().skip(1) {
            // A cell descends from column i-1 or i of the row above, so
            // both ragged edge cells have a single parent.
            let mut nxt: Vec<i64> = Vec::with_capacity(row.len());
            nxt.push(row[0] as i64 + best[0]);
            for i in 1..row.len() - 1 {
                nxt.push(row[i] as i64 + best[i - 1].min(best[i]));
            }
            nxt.push(row[row.len() - 1] as i64 + best[best.len() - 1]);
            best = nxt;
        }
        // The answer is the cheapest cell on the final row.
        best.iter().copied().min().unwrap() as i32
    }
}
