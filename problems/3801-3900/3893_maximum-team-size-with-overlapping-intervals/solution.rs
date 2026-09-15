impl Solution {
    // A team is valid when one member overlaps everyone else, so the largest
    // team is the largest set of intervals all overlapping a single interval.
    // For each interval i that is exactly the intervals j with
    // startTime[j] <= endTime[i] and endTime[j] >= startTime[i].
    pub fn maximum_team_size(startTime: Vec<i32>, endTime: Vec<i32>) -> i32 {
        let n = startTime.len();
        let mut starts = startTime.clone();
        let mut ends = endTime.clone();
        starts.sort();
        ends.sort();
        let mut best = 0usize;
        for i in 0..n {
            // Count starts no later than end minus ends earlier than start; the
            // second set is a subset of the first, so the difference is exactly
            // the overlapping intervals, including i itself.
            let starts_le = starts.partition_point(|&x| x <= endTime[i]);
            let ends_lt = ends.partition_point(|&x| x < startTime[i]);
            let overlap = starts_le - ends_lt;
            if overlap > best {
                best = overlap;
            }
        }
        best as i32
    }
}
