impl Solution {
    pub fn capture_forts(forts: Vec<i32>) -> i32 {
        // A move is only possible between two non-zero entries separated
        // by enemy forts, and it captures when the two ends differ (your
        // fort 1 -> empty -1 in either direction). One scan remembers the
        // previous non-zero position; every new non-zero closes the
        // stretch of zeros since then, so the best differing gap seen is
        // exactly the most enemy forts capturable.
        let mut best = 0;
        let mut last: i32 = -1;
        for (i, &value) in forts.iter().enumerate() {
            if value == 0 {
                continue;
            }
            if last >= 0 && value != forts[last as usize] {
                best = best.max(i as i32 - last - 1);
            }
            last = i as i32;
        }
        best
    }
}
