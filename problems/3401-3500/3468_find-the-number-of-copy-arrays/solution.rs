impl Solution {
    pub fn count_arrays(original: Vec<i32>, bounds: Vec<Vec<i32>>) -> i32 {
        // copy[0] fixes every later entry: copy[i] = copy[0] + original[i] - original[0].
        // Keep the window of admissible copy[0] values by folding each bound in.
        let mut lo = bounds[0][0];
        let mut hi = bounds[0][1];
        for i in 1..original.len() {
            let shift = original[i] - original[0];
            lo = lo.max(bounds[i][0] - shift);
            hi = hi.min(bounds[i][1] - shift);
            if lo > hi {
                return 0;
            }
        }
        hi - lo + 1
    }
}
