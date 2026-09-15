impl Solution {
    pub fn min_groups(intervals: Vec<Vec<i32>>) -> i32 {
        let n = intervals.len();
        let mut starts: Vec<i32> = intervals.iter().map(|x| x[0]).collect();
        let mut ends: Vec<i32> = intervals.iter().map(|x| x[1]).collect();
        starts.sort_unstable();
        ends.sort_unstable();
        // Answer = peak coverage depth: intervals sharing a point pairwise
        // intersect, so they need distinct groups, and peak depth suffices.
        // Only openings can create depth, so stop once starts are used up.
        let mut groups = 0;
        let mut active = 0;
        let (mut i, mut j) = (0usize, 0usize);
        while i < n {
            // '<=' keeps touching intervals ([1,5],[5,8]) overlapping —
            // the opening at ends[j] is processed before that close.
            if starts[i] <= ends[j] {
                active += 1;
                if active > groups {
                    groups = active;
                }
                i += 1;
            } else {
                active -= 1;
                j += 1;
            }
        }
        groups
    }
}
