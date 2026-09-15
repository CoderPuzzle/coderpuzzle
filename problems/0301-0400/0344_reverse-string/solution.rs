impl Solution {
    pub fn reverse_string(s: Vec<String>) -> Vec<String> {
        // Two indexes walk inward from both ends and swap each pair they
        // form: position i trades places with position n-1-i, so every
        // element crosses the middle exactly once and the array is reversed
        // when the indexes meet. The vector arrives by value; Vec::swap
        // moves the two String elements into each other's slots without
        // allocating, so the reversal happens in place with O(1) extra
        // memory beyond the array itself; the mutated vector is the answer.
        let mut s = s;
        let mut lo = 0;
        let mut hi = s.len() - 1;
        while lo < hi {
            s.swap(lo, hi);
            lo += 1;
            hi -= 1;
        }
        s
    }
}
