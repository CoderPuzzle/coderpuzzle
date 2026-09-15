impl Solution {
    pub fn find_min_arrow_shots(points: Vec<Vec<i32>>) -> i32 {
        let mut ordered = points;
        ordered.sort_by_key(|p| p[1]);
        // Point-cover greedy: sort by right endpoint and shoot at the right
        // end of the first unburst balloon — among points covering it, the
        // right endpoint covers every interval any earlier point could.
        let mut arrows = 0i32;
        // Sentinel below any coordinate (coordinates span signed 32-bit).
        let mut last_arrow = i64::MIN;
        for p in &ordered {
            // Strict >: intervals are closed, so start == last_arrow is
            // already burst; otherwise shoot at the earliest end remaining.
            if p[0] as i64 > last_arrow {
                arrows += 1;
                last_arrow = p[1] as i64;
            }
        }
        arrows
    }
}
