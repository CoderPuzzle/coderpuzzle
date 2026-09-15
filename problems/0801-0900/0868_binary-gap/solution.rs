impl Solution {
    pub fn binary_gap(mut n: i32) -> i32 {
        // One pass over the bits, low to high, remembering the index of the
        // most recent 1: each later 1 offers its distance to that index as a
        // candidate, and the answer is the largest such distance. n fits in
        // thirty bits under the bound, and the zeros past the final 1 close
        // no pair — they advance the index but are never measured.
        let mut best = 0;
        let mut previous = -1;
        let mut index = 0;
        while n != 0 {
            if n & 1 != 0 {
                if previous >= 0 {
                    best = best.max(index - previous);
                }
                previous = index;
            }
            n >>= 1;
            index += 1;
        }
        best
    }
}
