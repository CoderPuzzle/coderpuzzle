impl Solution {
    pub fn can_attend_meetings(mut intervals: Vec<Vec<i32>>) -> bool {
        // Overlap, if any, must sit between next-door meetings once the
        // order is by start time, so sorting makes one linear pass enough.
        intervals.sort_by_key(|interval| interval[0]);
        // A meeting ending exactly when the next begins is fine: the clash
        // test is strictly previous end > next start.
        for i in 1..intervals.len() {
            if intervals[i - 1][1] > intervals[i][0] {
                return false;
            }
        }
        true
    }
}
