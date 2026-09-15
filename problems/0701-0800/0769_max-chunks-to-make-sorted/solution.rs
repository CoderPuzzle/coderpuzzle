impl Solution {
    pub fn max_chunks_to_sorted(arr: Vec<i32>) -> i32 {
        // Prefix maximum sweep: the first i + 1 elements are exactly the
        // set {0..i} iff their maximum is i, so each such index is a cut.
        let mut chunks = 0;
        let mut run_max = -1;
        for (i, v) in arr.iter().enumerate() {
            if *v > run_max {
                run_max = *v;
            }
            // A boundary lands wherever the running max equals the index:
            // every legal cut is counted, and taking all of them is optimal.
            if run_max == i as i32 {
                chunks += 1;
            }
        }
        chunks
    }
}
