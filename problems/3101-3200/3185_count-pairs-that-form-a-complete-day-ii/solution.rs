impl Solution {
    pub fn count_complete_day_pairs(hours: Vec<i32>) -> i64 {
        // One left-to-right pass keeps a running count per residue class;
        // before joining its own bucket, each index adds the number of
        // earlier values carrying the complementary residue (24 - r) % 24.
        // The pair count reaches C(500000, 2) = 124999750000 at the
        // bounds, far beyond an i32, so accumulate in an i64.
        let mut counts = [0usize; 24];
        let mut answer: i64 = 0;
        for value in &hours {
            let r = (value % 24) as usize;
            answer += counts[(24 - r) % 24] as i64;
            counts[r] += 1;
        }
        answer
    }
}
