impl Solution {
    pub fn check_valid_cuts(n: i32, rectangles: Vec<Vec<i32>>) -> bool {
        Self::has_two_gaps(&rectangles, 0) || Self::has_two_gaps(&rectangles, 1)
    }

    fn has_two_gaps(rectangles: &Vec<Vec<i32>>, axis: usize) -> bool {
        // Two cuts split the rectangles along one axis exactly when that
        // axis's [start, end] projections fall into three or more groups.
        // Sweep the sorted projections once with a running furthest end:
        // each next start at or beyond it is a gap where a cut can pass
        // (touching edges included), and two such gaps make three groups.
        let mut intervals: Vec<(i32, i32)> = rectangles.iter().map(|r| (r[axis], r[axis + 2])).collect();
        intervals.sort();
        let mut gaps = 0;
        let mut reach = intervals[0].1;
        for &(start, end) in intervals.iter().skip(1) {
            if start >= reach {
                gaps += 1;
                if gaps == 2 {
                    return true;
                }
            }
            if end > reach {
                reach = end;
            }
        }
        false
    }
}
