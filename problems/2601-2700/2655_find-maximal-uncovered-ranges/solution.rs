impl Solution {
    // n can be 10^9, so nothing may touch cells directly. Sorting by
    // start and sweeping a cursor turns every stretch the cursor skips
    // over into one maximal uncovered range: a gap is emitted whenever
    // the next sorted range begins beyond the cursor, and the cursor
    // then jumps past that range's end (overlaps merge implicitly).
    pub fn find_maximal_uncovered_ranges(n: i32, ranges: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut rs = ranges;
        rs.sort_by_key(|r| r[0]);
        let mut res: Vec<Vec<i32>> = Vec::new();
        let mut cur: i64 = 0; // e + 1 reaches at most n <= 10^9: fits i32,
                              // but the running cursor is kept wide anyway
        for r in &rs {
            let s = r[0] as i64;
            let e = r[1] as i64;
            if s > cur {
                // Cells [cur, s - 1] meet no covering range.
                res.push(vec![cur as i32, (s - 1) as i32]);
            }
            if e + 1 > cur {
                cur = e + 1;
            }
        }
        if cur < n as i64 {
            res.push(vec![cur as i32, n - 1]);
        }
        res
    }
}
