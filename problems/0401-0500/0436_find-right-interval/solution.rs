impl Solution {
    pub fn find_right_interval(intervals: Vec<Vec<i32>>) -> Vec<i32> {
        // The right interval question is a lower-bound query: pair each
        // start with its index, sort by start, and the answer for an end is
        // the first pair whose start reaches it.
        let mut order: Vec<usize> = (0..intervals.len()).collect();
        order.sort_unstable_by_key(|&i| intervals[i][0]);
        let starts: Vec<i32> = order.iter().map(|&i| intervals[i][0]).collect();
        let mut result = Vec::with_capacity(intervals.len());
        for interval in &intervals {
            let end = interval[1];
            // Smallest slot whose start is >= end; starts.len() if none. The
            // kept half always contains that boundary, so the window halves
            // until only the boundary is left.
            let (mut lo, mut hi) = (0, starts.len());
            while lo < hi {
                let mid = (lo + hi) / 2;
                if starts[mid] < end {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            // i may equal j: an end its own start already reaches finds the
            // interval itself; off the end means no start qualifies.
            result.push(if lo < starts.len() { order[lo] as i32 } else { -1 });
        }
        result
    }
}
